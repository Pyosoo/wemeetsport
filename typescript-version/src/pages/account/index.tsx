import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alarmList } from 'src/recoil/account';
import axios from 'axios';
import { getAlarmListApi } from 'src/apis/accountApi';
import { snackbarState } from 'src/recoil/states';
import AlarmRow from 'src/components/alarmRow';
import { alarmInterface } from 'src/interfaces/interfaces';
import { FixedSizeList as List } from 'react-window';

const Page = () => {
  const [alarmListRC, setAlarmListRC] = useRecoilState(alarmList);
  const [snackbarStateRC, setSnackbarStateRC] = useRecoilState(snackbarState);

  useEffect(() => {
    const getAlarmList = async () => {
      const res = await getAlarmListApi();
      if (res && res.success) {
        setAlarmListRC(res.data);
      } else {
        setSnackbarStateRC(prev => ({
          ...prev,
          open: true,
          type: 'error',
          message: '알림 목록을 불러오지 못했습니다.'
        }));
      }
    };
    getAlarmList();
  }, []);

  const Row = ({ index, style, data }) => (
    <div style={{ ...style, margin: '5px 0' }}>
      <AlarmRow key={index} alarm={data} />
    </div>
  );

  if (alarmListRC && alarmListRC.length > 0) {
    return (
      <List height={150} itemCount={alarmListRC.length} itemSize={55} width='85%' itemData='Additional Data'>
        {({ index, style }) => Row({ index, style, data: alarmListRC[index] })}
      </List>
    );
  } else return <div> 활동 알람이 없습니다. </div>;
};

export default Page;
