import { Box } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { alarmInterface } from 'src/interfaces/interfaces';

export default function AlarmRow({ alarm }: { alarm: alarmInterface }) {
  // if (alarm.alarmType === 'text')
  return (
    <Box
      onClick={() => console.log(alarm)}
      sx={{
        backgroundColor: 'rgb(229 224 224)',
        borderRadius: '7px',
        width: '85%',
        height: '45px',
        lineHeight: '45px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        '&:hover': { cursor: 'pointer' }
      }}
    >
      <Box>{dayjs(alarm.createdAt).format('YYYY-MM-DD')}</Box>
    </Box>
  );
}
