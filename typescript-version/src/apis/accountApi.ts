import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://54.204.129.209:8080';

interface ApiResponse {
    success: boolean;
    data: string | object | undefined;
  }

export const getAlarmListApi = async () => {
    // accessTOken으로 받으면 되듯
    const res = await axios.get(`${API_URL}/test`,)
}