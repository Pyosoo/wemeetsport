// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getBoardApi } from 'src/apis/tableApi';
import CustomSearchBar from 'src/components/customSearchBar';
import CustomTable from 'src/components/customTable';
import useSession from 'src/hooks/useSession';
import { pageDataState } from 'src/recoil/table';

const Invite = () => {
  const [pageData, setPageData] = useRecoilState(pageDataState);

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
    };

    getBoard();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div>
          <CustomSearchBar category='basketball' type='invite' />
        </div>
        <CustomTable />
      </Grid>
    </Grid>
  );
};

export default Invite;
