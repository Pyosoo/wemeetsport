import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useRecoilState } from 'recoil'
import { pageDataState } from 'src/recoil/table'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { getBoardApi } from 'src/apis/tableApi'
import router from 'next/router'

interface SearchBarProps {
  category: string
  type: string
}

export default function CustomSearchBar(props: SearchBarProps) {
  const [pageData, setPageDataState] = useRecoilState(pageDataState)

  const SearchList = async () => {
    const res = await getBoardApi({
      category: props.category,
      type: props.type,
      pageNo: pageData.pageNo,
      pageSize: pageData.pageSize,
      search: pageData.search,
      searchOption: pageData.searchOption
    })

    if (res) {
      console.log(res)
      return res
    }
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete='off'
    >
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{ margin: '0 5px 0 auto', height: 55, marginTop: '3.5px' }}
          variant='contained'
          onClick={() => router.push('/makeboard')}
        >
          글쓰기
        </Button>
        <Select
          sx={{ width: 170, height: 55, marginTop: '3.5px' }}
          value={pageData.searchOption}
          label='Age'
          onChange={(e: SelectChangeEvent<string>) => {
            setPageDataState(prev => ({
              ...prev,
              searchOption: e.target.value
            }))
          }}
        >
          <MenuItem value={'title'}>글제목</MenuItem>
          <MenuItem value={'writer'}>작성자</MenuItem>
          <MenuItem value={'content'}>글내용</MenuItem>
        </Select>
        <TextField
          value={pageData.search}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setPageDataState(prev => ({
              ...prev,
              search: e.target.value
            }))
          }}
          label='검색어'
          id='outlined-size-small'
          defaultValue='검색어'
        />
        <Button sx={{ height: 55, marginTop: '3.5px' }} variant='outlined' onClick={SearchList}>
          검색
        </Button>
      </Box>
    </Box>
  )
}
