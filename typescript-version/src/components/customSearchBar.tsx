import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { pageDataState, tableDataState } from 'src/recoil/table';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { getBoardApi } from 'src/apis/tableApi';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import router from 'next/router';
import moment from 'moment';
import dayjs from 'dayjs';

interface SearchBarProps {
  category: string;
  type: string;
}

export default function CustomSearchBar(props: SearchBarProps) {
  const [pageData, setPageDataState] = useRecoilState(pageDataState);
  const [tableData, setTableDataState] = useRecoilState(tableDataState);

  const SearchList = async () => {
    const res = await getBoardApi({
      category: props.category,
      type: props.type,
      pageNo: pageData.pageNo,
      pageSize: pageData.pageSize,
      search: pageData.search,
      searchOption: pageData.searchOption,
      from: pageData.from,
      to: pageData.to
    });
    console.log(res);
    if (res && res.success) {
      console.log(res);
      setTableDataState(() => ({
        datas: res.data.dtoList
      }));
      return res;
    }
  };

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
        <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ padding: '0 !important' }} components={['DatePicker']}>
              <DatePicker
                onChange={date => {
                  setPageDataState(prev => ({
                    ...prev,
                    from: moment(dayjs(date).toDate()).format('YYYY-MM-DD')
                  }));
                }}
                label='시작일'
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box sx={{ height: '50px', lineHeight: '50px', marginTop: '10px' }}>~</Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ padding: '0 !important' }} components={['DatePicker']}>
              <DatePicker
                onChange={date => {
                  setPageDataState(prev => ({
                    ...prev,
                    to: moment(dayjs(date).toDate()).format('YYYY-MM-DD')
                  }));
                }}
                label='마감일'
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Select
          sx={{ width: 170, height: 55, marginTop: '3.5px' }}
          value={pageData.searchOption}
          label='Age'
          onChange={(e: SelectChangeEvent<string>) => {
            setPageDataState(prev => ({
              ...prev,
              searchOption: e.target.value
            }));
          }}
        >
          <MenuItem value={'title'}>글제목</MenuItem>
          <MenuItem value={'writer'}>작성자</MenuItem>
          <MenuItem value={'content'}>글내용</MenuItem>
        </Select>
        <TextField
          value={pageData.search}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') SearchList();
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setPageDataState(prev => ({
              ...prev,
              search: e.target.value
            }));
          }}
          label='검색어'
          id='outlined-size-small'
          defaultValue='검색어'
        />
        <Button
          onMouseOver={() => console.log(pageData)}
          sx={{ height: 55, marginTop: '3.5px' }}
          variant='outlined'
          onClick={SearchList}
        >
          검색
        </Button>

        <Button
          sx={{ margin: '0 5px 0 5px', height: 55, marginTop: '3.5px' }}
          variant='contained'
          onClick={() => router.push('/makeboard')}
        >
          글쓰기
        </Button>
      </Box>
    </Box>
  );
}
