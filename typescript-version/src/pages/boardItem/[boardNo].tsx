import { Box } from '@mui/material';
import router from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedBoardItem } from 'src/recoil/table';
import { KeyboardArrowLeft } from '@material-ui/icons';

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
  const [boardData, setBoardData] = useRecoilState(selectedBoardItem);

  console.log(boardData);

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
        <Box>종목: ({boardData.category})</Box>
      </Box>

      <div className='divider' />
      <Box>
        <Box>{boardData.content}</Box>
      </Box>
    </Box>
  );
}
