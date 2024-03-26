import axios from 'axios'

interface registerType {
  email: string
  password: string
  nickname: string
  mobile: string
}

export const registerApi = (payload: registerType) => {
  // const res = axios.post()
}
