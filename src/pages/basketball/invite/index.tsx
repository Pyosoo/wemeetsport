// ** MUI Imports
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getBoardApi } from 'src/apis/tableApi';
import CustomSearchBar from 'src/components/customSearchBar';
import CustomTable from 'src/components/customTable';
import useSession from 'src/hooks/useSession';
import { pageDataState, tableDataState } from 'src/recoil/table';
import dayjs from 'dayjs';
import { snackbarState } from 'src/recoil/states';

const Page = () => {
  const [pageData, setPageData] = useRecoilState(pageDataState);
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const [snackbarStateRC, setSnackbarStateRC] = useRecoilState(snackbarState);

  useSession();

  useEffect(() => {
    const getBoard = async () => {
      const res = await getBoardApi({
        category: 'basketball',
        type: 'invite',
        pageNo: pageData.pageNo,
        pageSize: pageData.pageSize,
        search: pageData.search,
        searchOption: pageData.searchOption,
        from: pageData.from,
        to: pageData.to
      });
      if (res && res.success) {
        setTableData(() => ({
          datas: res.data.dtoList
        }));
      } else {
        setSnackbarStateRC(prev => ({
          ...prev,
          open: true,
          message: '목록을 불러오는데 실패했습니다.',
          type: 'error'
        }));
      }
    };
    getBoard();

    return () => {
      setPageData(() => ({
        pageNo: 1,
        pageSize: 10,
        search: '',
        searchOption: 'title',
        from: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        to: dayjs(new Date()).format('YYYY-MM-DD')
      }));
    };
  }, []);

  console.log(pageData);
  console.log(tableData);

  return (
    <Grid container spacing={6} sx={{ minWidth: '1070px' }}>
      <Grid item xs={12}>
        <div>
          <CustomSearchBar category='basketball' type='invite' />
        </div>
        {tableData.datas !== null && tableData.datas.length > 0 ? (
          <CustomTable tableData={tableData.datas} />
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>검색조건에 맞는 글이 없습니다.</Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Page;
