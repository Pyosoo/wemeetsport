import { atom } from 'recoil';

export const pageDataState = atom({
  key: 'pageData',
  default: {
    pageNo: 1,
    pageSize: 10,
    search: '',
    searchOption: 'title' // title, content, writer(nickname)
  }
});

export const makeBoardState = atom({
  key: 'makeBoard',
  default: {
    title: '',
    content: '',
    category: '',
    type: '',
    date: new Date()
  }
});

export const tableDataState = atom({
  key: 'tableData',
  default: []
});
