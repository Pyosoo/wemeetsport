import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRecoilState } from 'recoil';
import { makeBoardState } from 'src/recoil/table';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import router from 'next/router';
import { makeBoardApi } from 'src/apis/tableApi';
import { snackbarState } from 'src/recoil/states';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';

export default function Makeboard() {
  const [makeBoard, setMakeBoardState] = useRecoilState(makeBoardState);
  const [snackbar, setSnackbarState] = useRecoilState(snackbarState);

  const optionVal = {
    invite: '시합 초청',
    recruit: '팀원 모집',
    rental: '대관 정보'
  };

  useEffect(() => {
    return () => {
      setMakeBoardState(prev => ({
        ...prev,
        title: '',
        content: '',
        category: '',
        type: ''
      }));
    };
  }, []);
  console.log(makeBoard);

  const makeBoardFunc = async () => {
    // const params = {
    //   category: makeBoard.category,
    //   type: makeBoard.type,
    //   title: makeBoard.title,
    //   content: makeBoard.content,
    //   date: makeBoard.date
    // };
    // console.log(params);
    // return;

    if (!makeBoard.category) {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '종목을 선택해주세요.',
        type: 'error'
      }));
      return;
    }
    if (!makeBoard.type) {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '게시판을 선택해주세요.',
        type: 'error'
      }));
      return;
    }

    const res = await makeBoardApi({
      category: makeBoard.category,
      type: makeBoard.type,
      title: makeBoard.title,
      content: makeBoard.content,
      matchDate: makeBoard.date
    });

    if (res && res.success) {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '글작성을 완료했습니다.',
        type: 'success'
      }));
      router.push('/basketball/invite');
    } else {
      setSnackbarState(prev => ({
        ...prev,
        open: true,
        message: '게시글 작성에 실패했습니다.',
        type: 'error'
      }));
    }
  };

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
                }));
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
              value={makeBoard.type}
              label='게시판'
              onChange={(e: SelectChangeEvent<string>) => {
                setMakeBoardState(prev => ({
                  ...prev,
                  type: e.target.value
                }));
              }}
            >
              <MenuItem value={'invite'}>시합 초청</MenuItem>
              <MenuItem value={'recruit'}>팀원 모집</MenuItem>
              <MenuItem value={'rental'}>대관 정보</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{ margin: '0 5px 0 10px', height: 55, marginTop: '3.5px' }}
            variant='contained'
            onClick={makeBoardFunc}
          >
            작성
          </Button>
        </Box>

        <div className='divider' />

        <Box>
          <Box sx={{ marginBottom: '10px', marginTop: '10px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  onChange={(date: Dayjs | null) => {
                    console.log(date);
                    setMakeBoardState(prev => ({
                      ...prev,
                      date: moment(dayjs(date).toDate()).format('YYYY-MM-DD')
                    }));
                  }}
                  label='날짜 선택'
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
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
              }));
            }}
          />
        </Box>
        <Box>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setMakeBoardState(prev => ({
                ...prev,
                content: e.target.value
              }));
            }}
            value={makeBoard.content}
            sx={{ width: '50%', minHeight: 500, marginTop: '10px' }}
            id='outlined-multiline-flexible'
            placeholder={`
            시합초청: 팀명,인원수,유니폼,연령대,실력 등 상세 입력  \n
            팀원모집: 활동지역, 연령대, 실력 등 상세 기입 \n
            대관정보: 체육관위치(대략), 가격 등 상세 기입
            `}
            label='글내용'
            multiline
            maxRows={100}
          />
        </Box>
      </Box>
    </div>
  );
}
