import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage
});

const snackbarState = atom({
  key: 'snackbarState',
  default: {
    open: false,
    message: '',
    type: 'success' || 'error' || '' // or error
  },
  effects_UNSTABLE: [persistAtom]
});

const modalState = atom({
  key: 'modalState',
  default: {
    open: false,
    message: '',
    type: ''
  }
})

const applyModalState = atom({
  key:'applyModalState',
  default:{
    open: false,
    message: '',
    title: '',
    applicant: '',
    alarmNo: 0
  }
})


export { snackbarState, modalState, applyModalState };
