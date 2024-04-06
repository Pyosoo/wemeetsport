import axios, { AxiosResponse } from 'axios'

const API_URL = 'http://3.80.99.192:8080'

interface registerType {
  email: string
  password: string
  nickName: string
  mobile: string
}
interface ApiResponse {
  success: boolean
  data: any
}

export const loginApi = async (email: string, password: string) => {
  const res = await axios
    .post(`${API_URL}/member/login`, {
      email,
      password
    })
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })

  return res
}

export const refreshToken = async (accessToken: string, refreshToken: string) => {
  const res = await axios
    .post(`${API_URL}/refreshToken`, {
      accessToken,
      refreshToken
    })
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })

  return res
}

export const signUpApi = (nickName: string, email: string, password: string, mobile: string) => {
  const res = axios
    .post(`${API_URL}/member/signup`, {
      nickName,
      email,
      password,
      mobile
    })
    .then((response: AxiosResponse<ApiResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })

  return res
}
