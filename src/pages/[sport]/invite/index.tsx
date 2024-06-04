// pages/[sport]/invite/index.tsx
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { getBoardApi } from 'src/apis/tableApi';
import CustomSearchBar from 'src/components/customSearchBar';
import CustomTable from 'src/components/customTable';
import useSession from 'src/hooks/useSession';
import { pageDataState, tableDataState, tableDataStateQuery } from 'src/recoil/table';
import dayjs from 'dayjs';
import { snackbarState } from 'src/recoil/states';
import { tableRowInterface } from 'src/interfaces/interfaces';
import { useRouter } from 'next/router';

const InvitePage = ({ sport }) => {
  const [pageData, setPageData] = useRecoilState(pageDataState);
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const [snackbarStateRC, setSnackbarStateRC] = useRecoilState(snackbarState);

  useSession();
  const router = useRouter();

  const tableDataLoadable = useRecoilValueLoadable(
    tableDataStateQuery({
      category: sport,
      type: 'invite'
    })
  );

  useEffect(() => {
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
  }, [sport]);

  switch (tableDataLoadable.state) {
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      return <div>Error on Loading</div>;
    case 'hasValue':
      const tableDataContents = tableDataLoadable.contents as tableRowInterface[];
      return (
        <div onClick={() => console.log(tableDataLoadable.contents)}>
          <Grid container spacing={6} sx={{ minWidth: '1070px' }}>
            <Grid item xs={12}>
              <div>
                <CustomSearchBar category={sport} type='invite' />
              </div>
              {tableDataContents.length > 0 ? (
                <CustomTable tableData={tableDataContents} />
              ) : (
                <Box sx={{ textAlign: 'center', marginTop: '50px' }}>검색조건에 맞는 글이 없습니다.</Box>
              )}
            </Grid>
          </Grid>
        </div>
      );
    default:
      return null;
  }
};

export async function getServerSideProps(context) {
  const { sport } = context.params;
  return {
    props: {
      sport
    }
  };
}

export default InvitePage;
