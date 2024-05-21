import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { pageDataState, tableDataState } from 'src/recoil/table';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { getBoardApi } from 'src/apis/tableApi';
import router from 'next/router';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';

import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

interface SearchBarProps {
  category: string;
  type: string;
}

export default function CustomSearchBar(props: SearchBarProps) {
  const [pageData, setPageDataState] = useRecoilState(pageDataState);
  const [tableData, setTableDataState] = useRecoilState(tableDataState);
  const [isLoading, setIsLoading] = React.useState(false);

  const SearchList = async () => {
    if (isLoading) return;

    setIsLoading(true);

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
    if (res && res.success) {
      console.log(res);
      setTableDataState(() => ({
        datas: res.data.dtoList
      }));
      setIsLoading(false);
      return res;
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'right', margin: '10px 0' }}>
        <RangePicker
          onChange={(dates, dateStrings) => {
            setPageDataState(prev => ({
              ...prev,
              from: dayjs(dateStrings[0]).format('YYYY-MM-DD'),
              to: dayjs(dateStrings[1]).format('YYYY-MM-DD')
            }));
          }}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
            <DemoItem component='DateRangePicker'>
              <DateRangePicker defaultValue={[dayjs(pageData.from), dayjs(pageData.to)]} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider> */}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'right', gap: '5px', marginBottom: '10px' }}>
        <Select
          sx={{ width: 170, height: 40 }}
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
          <MenuItem value={'nickName'}>작성자</MenuItem>
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
          size='small'
          sx={{ minWidth: '100px' }}
        />
        {isLoading ? (
          <LoadingButton
            sx={{ display: 'block', width: '72.6px', height: '40px' }}
            size='large'
            loading
            variant='outlined'
          >
            .
          </LoadingButton>
        ) : (
          <Button
            onMouseOver={() => console.log(pageData)}
            sx={{ minWidth: '70px', height: 40 }}
            variant='outlined'
            onClick={SearchList}
          >
            검색
          </Button>
        )}

        <Button sx={{ minWidth: '100px', height: 40 }} variant='contained' onClick={() => router.push('/makeboard')}>
          글쓰기
        </Button>
      </Box>
    </Box>
  );
}
