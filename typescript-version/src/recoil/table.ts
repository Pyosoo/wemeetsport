import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import moment from 'moment';
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

const nameState = atom({
  key: 'nameState',
  default: ''
});

export const pageDataState = atom({
  key: 'pageData',
  default: {
    pageNo: 1,
    pageSize: 10,
    search: '',
    searchOption: 'title', // title, content, writer(nickname),
    from: moment(new Date()).format('YYYY-MM-DD'),
    to: moment(new Date()).format('YYYY-MM-DD')
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
