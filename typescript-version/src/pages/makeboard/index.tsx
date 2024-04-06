import { Box } from '@mui/material'
import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useRecoilState } from 'recoil'
import { makeBoardState } from 'src/recoil/table'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import router from 'next/router'

export default function Makeboard() {
  const [makeBoard, setMakeBoardState] = useRecoilState(makeBoardState)

  return (
    <div>
      <Box>
        <Box sx={{ width: '100%' }}>
          <FormControl sx={{ width: '15%' }}>
            <InputLabel id='demo-simple-select-label'>종목</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              sx={{ width: '100%', height: 55, marginTop: '3.5px' }}
              value={makeBoard.category}
              label='종목'
              onChange={(e: SelectChangeEvent<string>) => {
                setMakeBoardState(prev => ({
                  ...prev,
                  category: e.target.value
                }))
              }}
            >
              <MenuItem value={'basketball'}>농구</MenuItem>
              <MenuItem value={'soccer'}>축구</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: '25%', marginLeft: '5px', marginRight: '5px' }}>
            <InputLabel id='demo-simple-select-label2'>게시판</InputLabel>
            <Select
              labelId='demo-simple-select-label2'
              sx={{ width: '100%', height: 55, marginTop: '3.5px' }}
              value={makeBoard.category}
              label='게시판'
              onChange={(e: SelectChangeEvent<string>) => {
                setMakeBoardState(prev => ({
                  ...prev,
                  type: e.target.value
                }))
              }}
            >
              <MenuItem value={'invite'}>시합 초청</MenuItem>
              <MenuItem value={'recruit'}>팀원 모집</MenuItem>
              <MenuItem value={'rental'}>대관 정보</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{ margin: '0 5px 0 auto', height: 55, marginTop: '3.5px' }}
            variant='contained'
            onClick={() => {}}
          >
            작성
          </Button>
        </Box>

        <div className='divider' />

        <Box>
          <TextField
            sx={{ width: '50%' }}
            id='outlined-basic'
            label='글제목'
            variant='outlined'
            value={makeBoard.title}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setMakeBoardState(prev => ({
                ...prev,
                title: event.target.value
              }))
            }}
          />
        </Box>
        <Box>
          <TextField
            sx={{ width: '50%', minHeight: 500, marginTop: '10px' }}
            id='outlined-multiline-flexible'
            label='글내용'
            multiline
            rows={10}
            maxRows={100}
          />
        </Box>
      </Box>
    </div>
  )
}