import { Box } from 'mdi-material-ui';
import React from 'react';

interface alarmInterface {
  id: string;
  boardNo: number;
  title: string;
  boardStatus: boolean;
  writer: string;
  applicant: string;
  type: string;
  category: string;
  status: string; // complet progress reject 신청자체의 status
  message: string;
}

export default function AlarmRow(props: alarmInterface) {
  return <Box sx={{ backgroundColor: 'white', borderRadius: '7px', width: '75%' }}>test</Box>;
}
