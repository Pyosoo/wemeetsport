import axios from 'axios'

const API_URL = 'http://172.30.1.45:8080/member/login'

interface registerType {
  email: string
  password: string
  nickname: string
  mobile: string
}

export const registerApi = () => {
  // axios.get(API_URL).then(r => r)
}

export const loginApi = (email: string, password: string) => {
  const res = axios
    .post(API_URL, {
      email,
      mpw: password
    })
    .then(r => r)

  return res
}

export const refreshToken = () => {
  const res = axios
    .post('http://172.30.1.45:8080/refreshToken', {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTE2MTM0MTksImlhdCI6MTcxMTUyNzAxOSwiZW1haWwiOiJhcGl1c2VyMSJ9.MDrMhMCwj2ul6qVb2w4nH5GlSeBabNhUQ9XG2Kd3VUE',
      refreshToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQxMTg3ODAsImlhdCI6MTcxMTUyNjc4MCwiZW1haWwiOiJhcGl1c2VyMSJ9.CpZWZEUnSCt7TQzE45xE_lY9PbqqQX0Q10G6Acxg7rk'
    })
    .then(r => r)

  return res
}

export const signUpApi = () => {
  const res = axios
    .post('http://172.30.1.45:8080/member/signup', {
      mpw: '123',
      nickname: '123',
      email: '123',
      mobile: '123'
    })
    .then(r => r)

  return res
}
