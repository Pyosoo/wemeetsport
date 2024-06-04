import { atom, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import dayjs from 'dayjs';
import { tableRowInterface } from 'src/interfaces/interfaces';

import { getBoardApi } from 'src/apis/tableApi';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;


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
    datas: [] as tableRowInterface[]
  },
  effects_UNSTABLE: [persistAtom]
});

interface tableDataParam {
  category: string;
  type: string;
  [key: string]: string;
}

export const tableDataStateQuery = selectorFamily<tableRowInterface[], tableDataParam>({
  key: 'tableData',
  get: (param: tableDataParam) => async ({ get }) => {
    const tableData = get(tableDataState);
    const res = await getBoardApi({
      pageNo: tableData.pageNo,
      pageSize: tableData.pageSize,
      search: tableData.search,
      searchOption: tableData.searchOption,
      from: tableData.from,
      to: tableData.to,
      category: param.category,
      type: param.type,
    });

    if (res && res.success) {
      if (typeof res.data === 'string') {
        throw new Error('Unexpected string data');
      }
      return res.data.dtoList;
    } else {
      throw new Error('Failed to load data');
    }
  }
});

export const selectedBoardItem = atom({
  key: 'selectedBoardItem',
  default: {
    boardNo:'',
    boardData: ''
  },
  effects_UNSTABLE: [persistAtom]
});
