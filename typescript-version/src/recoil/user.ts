import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage
});

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
  },
  effects_UNSTABLE: [persistAtom]
});

export const loginState = atom({
  key: 'loginInfo',
  default: {
    email: '',
    password: ''
  },
  effects_UNSTABLE: [persistAtom]
});

export const userState = atom({
  key: 'user',
  default: {
    email: '',
    nickName: '',
    profileImage: ''
  },
  effects_UNSTABLE: [persistAtom]
});

export const registerInfoState = atom({
  key: 'registerInfo',
  default: {
    email: '',
    password: '',
    nickName: '',
    mobile: ''
  },
  effects_UNSTABLE: [persistAtom]
});
