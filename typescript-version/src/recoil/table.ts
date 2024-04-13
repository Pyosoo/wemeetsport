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

export const pageDataState = atom({
  key: 'pageData',
  default: {
    pageNo: 1,
    pageSize: 10,
    search: '',
    searchOption: 'title' // title, content, writer(nickname)
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
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const selectedBoardItem = atom({
  key: 'selectedBoardItem',
  default: {},
  effects_UNSTABLE: [persistAtom]
});
