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

export default function CustomTable(props: tableRow[]) {
  const [BoardItem, setSelectedBoardItem] = useRecoilState(selectedBoardItem);
  const tableData = props.tableData;
  console.log(tableData);

  const getBoardItem = async (boardNo: string) => {
    const res = await getBoardItemApi(boardNo);
    if (res && res.success) {
      console.log(res);
      setSelectedBoardItem(prev => ({
        ...prev,
        ...res.data
      }));
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
          {tableData.map(row => (
            <TableRow key={row.boardNo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell onClick={() => getBoardItem(row.boardNo)} component='th' scope='row'>
                {row.title}
              </TableCell>
              <TableCell align='right'>{row.nickName}</TableCell>
              <TableCell align='right'>{row.createdAt}</TableCell>
              <TableCell align='right'>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
