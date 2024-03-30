import axios, { AxiosResponse } from 'axios'

const API_URL = 'http://172.30.1.45:8080/'

interface registerType {
  email: string
  password: string
  nickname: string
  mobile: string
}
interface SignUpResponse {
  success: boolean
  data: any // 적절한 데이터 타입으로 변경해 주세요
}

export const loginApi = async (email: string, password: string) => {
  const res = await axios
    .post(`${API_URL}/member/login`, {
      email,
      mpw: password
    })
    .then((response: AxiosResponse<SignUpResponse>) => response.data)
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
    .then((response: AxiosResponse<SignUpResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })

  return res
}

export const signUpApi = (nickname: string, email: string, password: string, mobile: string) => {
  const res = axios
    .post(`${API_URL}/member/signup`, {
      nickname,
      email,
      password,
      mobile
    })
    .then((response: AxiosResponse<SignUpResponse>) => response.data)
    .catch(err => {
      console.log(err)
    })

  return res
}
