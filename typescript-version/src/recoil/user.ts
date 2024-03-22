import { atom } from 'recoil'

export const sessionState = atom({
  key: 'session',
  default: {
    state: false,
    email: '',
    nickname: '',
    mobile: '',
    sessionToken: '',
    refreshToken: ''
  }
})

export const userState = atom({
  key: 'user',
  default: {
    email: '',
    nickname: '',
    profileImage: ''
  }
})

export const loginInfoState = atom({
  key: 'loginInfo',
  default: {
    email: '',
    password: ''
  }
})

export const registerInfoState = atom({
  key: 'registerInfo',
  default: {
    email: '',
    password: '',
    nickname: '',
    mobile: ''
  }
})