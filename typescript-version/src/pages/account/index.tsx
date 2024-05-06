import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alarmList } from 'src/recoil/account';
import axios from 'axios';
import { getAlarmListApi } from 'src/apis/accountApi';
import { snackbarState } from 'src/recoil/states';
import AlarmRow from 'src/components/alarmRow';
import { alarmInterface } from 'src/interfaces/interfaces';

const Page = () => {
  const [alarmListRC, setAlarmListRC] = useRecoilState(alarmList);
  const [snackbarStateRC, setSnackbarStateRC] = useRecoilState(snackbarState);

  useEffect(() => {
    const getAlarmList = async () => {
      const res = await getAlarmListApi();
      console.log(res);
      if (res && res.success) {
        console.log(res);
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

  if (alarmListRC && alarmListRC.length > 0) {
    return (
      <>
        {alarmListRC.map((alarmData: alarmInterface, index: number) => (
          <AlarmRow key={index} alarm={alarmData} />
        ))}
      </>
    );
  } else return <div> 활동 알람이 없습니다. </div>;
};

export default Page;
