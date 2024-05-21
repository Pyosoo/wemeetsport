import { Box } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useRecoilState } from 'recoil';
import { alarmInterface } from 'src/interfaces/interfaces';
import { applyModalState } from 'src/recoil/states';

export default function AlarmRow({ alarm }: { alarm: alarmInterface }) {
  const [applyModalStateRC, setApplyModalStateRC] = useRecoilState(applyModalState);

  // if (alarm.alarmType === 'text')
  return (
    <Box
      onClick={() => {
        console.log(alarm);
        setApplyModalStateRC(prev => ({
          open: true,
          message: '알림을 승인하시겠습니까?',
          title: alarm.title,
          applicant: alarm.applicant,
          alarmNo: alarm.alarmNo
        }));
      }}
      sx={{
        display: 'flex',
        backgroundColor: 'rgb(229 224 224)',
        borderRadius: '7px',
        width: '85%',
        height: '45px',
        lineHeight: '45px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        padding: '0 15px',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#908d8d'
        }
      }}
    >
      <Box>{alarm.title}</Box>
      <Box sx={{ marginLeft: 'auto' }}>
        {dayjs(alarm.createdAt).format('YYYY-MM-DD')}
        <span
          style={{
            fontSize: '15px',
            marginLeft: '10px',
            color: alarm.status === 'progress' ? 'green' : alarm.status === 'reject' ? 'red' : 'blue'
          }}
        >
          ●
        </span>
      </Box>
    </Box>
  );
}
