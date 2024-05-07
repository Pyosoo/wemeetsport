import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponseInterface, boardApplyTypeInterface, getBoardTypeInterface, makeBoardTypeInterface } from 'src/interfaces/interfaces';
const API_URL = 'http://54.204.129.209:8080';


export const getBoardApi = async (props: getBoardTypeInterface) => {
  return await axios
    .get(`${API_URL}/board/list`, {
      params: { ...props }
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

};

export const makeBoardApi = async (props: makeBoardTypeInterface) => {
  return await axios
    .post(
      `${API_URL}/board/api/register`,
      {
        ...props
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('WMS_accessToken')}`
        }
      }
    )
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

};

export const getBoardItemApi = async (boardNo: string) => {
  return await axios
    .get(`${API_URL}/board/${boardNo}`)
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err);
    });

};



export const boardApply = async (props: boardApplyTypeInterface) => {
  return await axios
    .post(`${API_URL}/alarm/api/`,
      {...props},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('WMS_accessToken')}`
        }
      }
    ).then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    
};