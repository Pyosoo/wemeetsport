// account

export interface alarmInterface {
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
    // alarmType: string; // 'text' or 'apply'
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
    from: string,
    to: string;
  }

export interface makeBoardTypeInterface {
    category: string;
    type: string;
    title: string;
    content: string;
    matchDate: string;
  }
  
export interface boardApplyTypeInterface{
    boardNo: string;
    applicantEmail: string;
    message: string;
  }
  
export interface registerTypeInterface {
    email: string;
    password: string;
    nickName: string;
    mobile: string;
  }