import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponseInterface } from 'src/interfaces/interfaces';
import { checkSession } from './userApi';
const API_URL = 'http://54.204.129.209:8080';


export const getAlarmListApi = async () => {
    checkSession();

    return await axios.get(`${API_URL}/alarm/api/`,{
      headers: {
        Authorization: `Bearer ${Cookies.get('WMS_accessToken')}`
      }
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err)
    })
}

export const decideAlarmApi = async () => {
  checkSession();

  console.log("decideAlarm");
}