// account

export interface alarmInterface {
  alarmNo: number;
  boardNo: number;
  title: string;
  boardStatus: boolean;
  writer: string;
  applicant: string;
  type: string;
  category: string;
  status: string; // complete progress reject 신청자체의 status
  message: string;
  alarmType: string;
  createdAt: string;
}

// table

export interface tableRowInterface {
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

// api

export interface ApiResponseInterface {
  success: boolean;
  data: string | object;
}

export interface getBoardTypeInterface {
  category: string;
  type: string;
  pageNo: number;
  pageSize: number;
  search: string;
  searchOption: string;
  from: string;
  to: string;
}

export interface makeBoardTypeInterface {
  category: string;
  type: string;
  title: string;
  content: string;
  matchDate: string;
}

export interface boardApplyTypeInterface {
  boardNo: string;
  message: string;
}

export interface registerTypeInterface {
  email: string;
  password: string;
  nickName: string;
  mobile: string;
}
