// ** MUI Imports
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getBoardApi } from 'src/apis/tableApi';
import CustomSearchBar from 'src/components/customSearchBar';
import CustomTable from 'src/components/customTable';
import useSession from 'src/hooks/useSession';
import { pageDataState, tableDataState } from 'src/recoil/table';

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

const Invite = () => {
  const [pageData, setPageData] = useRecoilState(pageDataState);
  const [tableData, setTableData] = useRecoilState(tableDataState);

  useSession();

  useEffect(() => {
    const getBoard = async () => {
      const res = await getBoardApi({
        category: 'basketball',
        type: 'invite',
        pageNo: pageData.pageNo,
        pageSize: pageData.pageSize,
        search: pageData.search,
        searchOption: pageData.searchOption
      });
      if (res && res.success) {
        setTableData(() => ({
          datas: res.data.dtoList
        }));
      }
    };

    getBoard();

    return () => {
      setPageData(() => ({
        pageNo: 1,
        pageSize: 10,
        search: '',
        searchOption: 'title'
      }));
    };
  }, []);

  console.log(tableData);

  return (
    <Grid container spacing={6} onClick={() => console.log(tableData)}>
      <Grid item xs={12}>
        <div>
          <CustomSearchBar category='basketball' type='invite' />
        </div>
        {tableData.datas !== null && tableData.datas.length > 0 ? (
          <CustomTable tableData={tableData.datas} />
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>검색조건에 맞는 글이 없습니다.</Box>
        )}
        {/* <CustomTable tableData={tableData} /> */}
      </Grid>
    </Grid>
  );
};

export default Invite;
