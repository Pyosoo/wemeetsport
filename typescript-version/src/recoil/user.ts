import { atom } from 'recoil'

export const sessionState = atom({
  key: 'session',
  default: {
    state: false,
    email: '',
    nickName: '',
    mobile: '',
    exp: '',
    iat: '',
    accessToken: '',
    refreshToken: ''
  }
})

export const loginState = atom({
  key: 'loginInfo',
  default: {
    email: '',
    password: ''
  }
})

export const userState = atom({
  key: 'user',
  default: {
    email: '',
    nickName: '',
    profileImage: ''
  }
})

export const registerInfoState = atom({
  key: 'registerInfo',
  default: {
    email: '',
    password: '',
    nickName: '',
    mobile: ''
  }
})
