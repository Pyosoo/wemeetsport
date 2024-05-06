import { Box } from '@mui/material';
import React from 'react';
import { alarmInterface } from 'src/interfaces/interfaces';

export default function AlarmRow({ alarm }: { alarm: alarmInterface }) {
  // if (alarm.alarmType === 'text')
  return (
    <Box
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
      {alarm.title} /
    </Box>
  );
}
