import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import moment from 'moment';
const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage
});

export const alarmList = atom({
  key: 'selectedBoardItem',
  default: [],
  effects_UNSTABLE: [persistAtom]
});
