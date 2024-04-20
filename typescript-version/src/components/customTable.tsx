import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getBoardItemApi } from 'src/apis/tableApi';
import { useRecoilState } from 'recoil';
import { selectedBoardItem } from 'src/recoil/table';
import router from 'next/router';

const rows = [
  {
    title: 'title',
    writer: 'writer',
    createdAt: '2022.02.02',
    status: 'complete' // complete, process
  }
];

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

interface propTypes {
  tableData: tableRow[];
}

export default function CustomTable(props: propTypes) {
  const [BoardItem, setSelectedBoardItem] = useRecoilState(selectedBoardItem);
  console.log(props);
  const getBoardItem = async (boardNo: number) => {
    const res = await getBoardItemApi(boardNo + '');
    if (res && res.success) {
      setSelectedBoardItem(prev => ({
        ...prev,
        ...(res.data as object)
      }));
      router.push(`/boardItem/${boardNo}`);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>글제목</TableCell>
            <TableCell align='right'>작성자</TableCell>
            <TableCell align='right'>작성일</TableCell>
            <TableCell align='right'>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData && props.tableData.length > 0
            ? props.tableData.map((row: tableRow) => (
                <TableRow
                  onClick={() => getBoardItem(row.boardNo)}
                  className='hover'
                  key={row.boardNo}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.title}
                  </TableCell>
                  <TableCell align='right'>{row.nickName}</TableCell>
                  <TableCell align='right'>{row.createdAt}</TableCell>
                  <TableCell align='right'>{row.status}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
