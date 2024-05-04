import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponseInterface, registerTypeInterface } from 'src/interfaces/interfaces';

const API_URL = 'http://54.204.129.209:8080';


export const loginApi = async (email: string, password: string) => {
  const res = await axios
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

  return res;
};



export const refreshToken = async (accessToken: string, refreshToken: string) => {
  const res = await axios
    .post(`${API_URL}/refreshToken`, {
      accessToken,
      refreshToken
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

  return res;
};

export const signUpApi = (props: registerTypeInterface) => {
  const res = axios
    .post(`${API_URL}/member/signup`, {
      ...props
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

  return res;
};
