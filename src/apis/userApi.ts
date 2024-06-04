import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ApiResponseInterface, registerTypeInterface } from 'src/interfaces/interfaces';

const API_URL = 'http://54.204.129.209:8080';


export const loginApi = async (email: string, password: string) => {
  return await axios
    .post(`${API_URL}/member/login`, {
      email,
      password
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => {
      if (typeof response.data === 'object' && response.data !== null) {
        const data = response.data;
        console.log(response.data)
        if (typeof response.data.data === 'object' && 'accessToken' in response.data.data && 'refreshToken' in response.data.data) {
          // access token과 refresh token이 있는 경우
          const accessToken: string = (response.data.data as { accessToken: string }).accessToken;
          const refreshToken: string = (response.data.data as { refreshToken: string }).refreshToken;
        
          Cookies.set('WMS_accessToken', accessToken);
          Cookies.set('WMS_refreshToken', refreshToken);
        
          return response.data;
        } else {
          console.error('Missing accessToken or refreshToken in response data');
          return {
            success: false,
            data: "로그인 에러1"
          }; // 또는 다른 처리를 수행할 수 있습니다.
        }
      } else {
        console.error('Response data is not an object');
        return {
          success: false,
          data: "로그인 에러2"
        }; ; // 또는 다른 처리를 수행할 수 있습니다.
      }
    })
    .catch(err => {
      console.error(err);
    });

};



export const refreshToken = async (accessToken: string, refreshToken: string) => {
  return await axios
    .post(`${API_URL}/refreshToken`, {
      accessToken,
      refreshToken
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

};

export const signUpApi = (props: registerTypeInterface) => {
  return axios
    .post(`${API_URL}/member/signup`, {
      ...props
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

};



interface atInterface {
  mobile: string;
  exp: string;
  iat: string;
  nickName: string;
  email: string;
}

export const checkSession = () => {
  console.log("checksession 실행")
  const at = Cookies.get('WMS_accessToken');
  const rt = Cookies.get('WMS_refreshToken');

  const refreshSession = async () => {
    if (!at || !rt) return; // 타입스크립트가 at와 rt가 string임을 인식하도록 합니다.
    const res = await refreshToken(at, rt);
    if (res && res.success) {
      Cookies.set('WMS_accessToken', res.data.accessToken);
      Cookies.set('WMS_refreshToken', res.data.refreshToken);
    } else {
      Cookies.remove('WMS_accessToken');
      Cookies.remove('WMS_refreshToken');
      window.location.href = '/login'; 
    }
  };

  if(!at || !rt){
    window.location.href = '/login'; 
  }

  if (at && rt) {
    const atDecoded: atInterface = jwtDecode(at);
    const cur = new Date().getTime();
    const sessionExpTime = parseInt(atDecoded.exp + '000');

    if (cur > sessionExpTime) {
      console.log('refreshToken!');
      refreshSession();
    } else {
      console.log('Token is alive.');
    }
  } else {
    window.location.href = '/login'; 
  }
}
