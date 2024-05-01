import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import dayjs from 'dayjs';
const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

interface tableRow {
  boardNo: number;
  category: string;
  content: string;
  createdAt: string;
  email: string;
  matchDate: string;
  nickName: string;
  status: string;
  title: string;
  type: string;
}

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage
});


export const pageDataState = atom({
  key: 'pageData',
  default: {
    pageNo: 1,
    pageSize: 10,
    search: '',
    searchOption: 'title', // title, content, nickname,
    from: dayjs().subtract(1, 'year').format('YYYY-MM-DD'), // Day.js 사용
    to: dayjs(new Date()).format('YYYY-MM-DD') // Day.js 사용
  },
  effects_UNSTABLE: [persistAtom]
});

export const makeBoardState = atom({
  key: 'makeBoard',
  default: {
    title: '',
    content: '',
    category: '',
    type: '',
    date: ''
  },
  effects_UNSTABLE: [persistAtom]
});


export const tableDataState = atom({
  key: 'tableData',
  default: {
    datas: [] as tableRow[]
  },
  effects_UNSTABLE: [persistAtom]
});

export const selectedBoardItem = atom({
  key: 'selectedBoardItem',
  default: {
    boardNo:'',
    boardData: ''
  },
  effects_UNSTABLE: [persistAtom]
});
