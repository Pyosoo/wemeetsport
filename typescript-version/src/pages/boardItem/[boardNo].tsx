import { Box } from '@mui/material';
import router from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedBoardItem } from 'src/recoil/table';

export default function BoardItem() {
  const [boardData, setBoardData] = useRecoilState(selectedBoardItem);

  console.log(boardData);

  return (
    <Box>
      <Box display={'flex'}>
        <Box onClick={() => router.back()}>←</Box>
        <Box>제목</Box> {boardData.title}
        <Box sx={{ marginLeft: 'auto' }}>
          {boardData.createdAt}
          <span style={{ marginLeft: '10px', color: boardData.status === '완료' ? 'green' : 'red' }}>
            {boardData.status === '완료' ? '완료' : '미완료'}●
          </span>
        </Box>
      </Box>
      <div className='divider' />
      <Box>
        <Box>
          종목: {boardData.category} 게시판종류: {boardData.type}
        </Box>
      </Box>
      <Box>
        <Box>{boardData.content}</Box>
      </Box>
    </Box>
  );
}
