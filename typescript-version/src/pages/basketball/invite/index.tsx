// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getBoardApi } from 'src/apis/tableApi';
import CustomSearchBar from 'src/components/customSearchBar';
import CustomTable from 'src/components/customTable';
import useSession from 'src/hooks/useSession';
import { pageDataState } from 'src/recoil/table';

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
  const [tableData, setTableData] = useState<tableRow[]>([]);

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
        setTableData(res.data.dtoList);
      }
    };

    getBoard();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <CustomSearchBar category='basketball' type='invite' />
        </div>
        {tableData.length > 0 ? <CustomTable tableData={tableData} /> : null}
        {/* <CustomTable tableData={tableData} /> */}
      </Grid>
    </Grid>
  );
};

export default Invite;
