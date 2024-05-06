import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponseInterface } from 'src/interfaces/interfaces';
const API_URL = 'http://54.204.129.209:8080';


export const getAlarmListApi = async () => {
    const res = await axios.get(`${API_URL}/alarm/api/`,{
      headers: {
        Authorization: `Bearer ${Cookies.get('WMS_accessToken')}`
      }
    })
    .then((response: AxiosResponse<ApiResponseInterface>) => response.data)
    .catch(err => {
      console.log(err)
    })

    return res;
}