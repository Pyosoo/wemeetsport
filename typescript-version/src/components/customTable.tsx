import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const rows = [
  {
    title: 'title',
    writer: 'writer',
    createdAt: '2022.02.02',
    status: 'complete' // complete, process
  }
]

export default function CustomTable() {
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
          {rows.map(row => (
            <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.title}
              </TableCell>
              <TableCell align='right'>{row.writer}</TableCell>
              <TableCell align='right'>{row.createdAt}</TableCell>
              <TableCell align='right'>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
