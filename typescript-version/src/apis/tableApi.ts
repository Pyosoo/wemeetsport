import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://54.204.129.209:8080';

interface getBoardType {
  category: string;
  type: string;
  pageNo: number;
  pageSize: number;
  search: string;
  searchOption: string;
  from: string,
  to: string;
}
interface ApiResponse {
  success: boolean;
  data: string | object | undefined;
}

export const getBoardApi = async (props: getBoardType) => {
  const res = await axios
    .get(`${API_URL}/board/list`, {
      params: { ...props }
    })
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err);
    });

  return res;
};

interface makeBoardType {
  category: string;
  type: string;
  title: string;
  content: string;
  matchDate: string;
}

interface boardApplyType{
  boardNo: string;
  applicantEmail: string;
  message: string;
}

export const makeBoardApi = async (props: makeBoardType) => {
  const res = await axios
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
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err);
    });

  return res;
};

export const getBoardItemApi = async (boardNo: string) => {
  const res = await axios
    .get(`${API_URL}/board/${boardNo}`)
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err);
    });

  return res;
};



export const boardApply = async (props: boardApplyType) => {
  console.log(props);
  return ;
  const res = await axios
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
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err);
    });

  return res;
};