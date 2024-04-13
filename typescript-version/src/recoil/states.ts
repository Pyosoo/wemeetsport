import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage
});

const nameState = atom({
  key: 'nameState',
  default: ''
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

export { nameState, snackbarState };
