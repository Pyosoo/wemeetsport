import { Box } from '@mui/material';
import router from 'next/router';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedBoardItem } from 'src/recoil/table';
import { KeyboardArrowLeft } from '@material-ui/icons';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { sessionState } from 'src/recoil/user';
import { modalState, snackbarState } from 'src/recoil/states';
import { boardApply } from 'src/apis/tableApi';

const boardType = {
  invite: '시합 초청',
  recruit: '팀원 모집',
  rental: '대관 정보'
};
const categoryType = {
  basketball: '농구',
  soccer: '축구'
};

export default function BoardItem() {
  const { boardData } = useRecoilValue(selectedBoardItem);
  const [session, setSessionState] = useRecoilState(sessionState);
  const [modalRC, setModalRC] = useRecoilState(modalState);
  const [snackbarStateRC, setSnackbarStateRC] = useRecoilState(snackbarState);

  console.log(boardData);

  const handleApply = async () => {
    if (boardData.email === session.email) {
      setSnackbarStateRC(() => ({
        open: true,
        message: '본인글엔 신청할 수 없습니다.',
        type: 'error'
      }));
      return;
    }

    setModalRC(prev => ({
      ...prev,
      open: true,
      type: 'invite'
    }));

    // if (res && res.success) {
    //   setSnackbarStateRC(prev => ({
    //     ...prev,
    //     open: true,
    //     message: '신청되었습니다.',
    //     type: 'success'
    //   }));
    // } else {
    //   setSnackbarStateRC(prev => ({
    //     ...prev,
    //     open: true,
    //     message: '오류',
    //     type: 'error'
    //   }));
    // }
  };

  return (
    <Box>
      <Box display={'flex'}>
        <Box onClick={() => router.back()}>
          <KeyboardArrowLeft className='cursorHover' />
        </Box>
        <Box sx={{ marginLeft: '20px' }}>제목</Box> {boardData.title} ({boardType[boardData.type]}) (
        {categoryType[boardData.category]})
        <Box sx={{ marginLeft: 'auto' }}>
          {boardData.createdAt}
          <span style={{ marginLeft: '10px', color: boardData.status === '완료' ? 'green' : 'red' }}>
            {boardData.status === '완료' ? '완료' : '미완료'}●
          </span>
        </Box>
      </Box>
      <div className='divider' />

      <Box>
        <Box>{boardData.content}</Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '35px 0' }}>
        <Button onClick={() => handleApply()} variant='contained'>
          {boardData.status ? '매칭 완료' : '신청하기'}
        </Button>
      </Box>
    </Box>
  );
}
