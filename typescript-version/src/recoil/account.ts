import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import moment from 'moment';
const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage
});

interface alarmInterface {
    id: string;
    boardNo: number;
    title: string;
    boardStatus: boolean;
    writer: string;
    applicant: string;
    type: string;
    category: string;
    status: string; // complet progress reject 신청자체의 status
    message: string;
  }
  
export const alaramList = atom({
  key: 'selectedBoardItem',
  default: [],
  effects_UNSTABLE: [persistAtom]
});
