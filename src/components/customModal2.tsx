import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { applyModalState, modalState, snackbarState } from 'src/recoil/states';
import Button from '@mui/material/Button';
import { decideAlarmApi, getAlarmListApi } from 'src/apis/accountApi';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 12,
  borderRadius: '3px',
  borderTop: '5px solid blue',
  pt: 2,
  px: 4,
  pb: 3
};

export default function CustomModal2() {
  const [applyModalStateRC, setApplyModalStateRC] = useRecoilState(applyModalState);
  const setSnackbarStateRC = useSetRecoilState(snackbarState);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleClose = () => {
    setApplyModalStateRC(() => ({
      open: false,
      message: '',
      title: '',
      applicant: '',
      alarmNo: 0
    }));
  };

  const handleProcess = async (result: boolean) => {
    setIsLoading(true);
    const res = await decideAlarmApi(applyModalStateRC.alarmNo, result);
    if (res && res.success) {
      setIsLoading(false);
      setSnackbarStateRC(() => ({
        open: true,
        message: '요청처리가 완료되었습니다.',
        type: 'success'
      }));
      setApplyModalStateRC(prev => ({
        open: false,
        message: '',
        title: '',
        applicant: '',
        alarmNo: 0
      }));
      getAlarmListApi();
    } else {
      setIsLoading(false);
      setSnackbarStateRC(() => ({
        open: true,
        message: '요청처리에 오류가 발생했습니다.',
        type: 'error'
      }));
    }
  };

  return (
    <div>
      <Modal
        open={applyModalStateRC.open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ textAlign: 'center', margin: '5px 0' }}>
            <Box sx={{ color: '#06068c', fontWeight: 800, fontSize: 16 }}>글제목</Box>
            <Box>{applyModalStateRC.title}</Box>
          </Box>
          <Box sx={{ textAlign: 'center', margin: '5px 0' }}>
            <Box sx={{ color: '#06068c', fontWeight: 800, fontSize: 16 }}>지원자</Box>
            <Box>{applyModalStateRC.applicant}</Box>
          </Box>
          <Box sx={{ textAlign: 'center', margin: '5px 0' }}>
            <Box sx={{ color: '#06068c', fontWeight: 800, fontSize: 16 }}>메시지</Box>
            <Box>{applyModalStateRC.message}</Box>
          </Box>

          {isLoading ? (
            <LoadingButton
              sx={{ display: 'block', width: '72.6px', margin: '15px auto 0 auto' }}
              size='large'
              loading
              variant='outlined'
            >
              .
            </LoadingButton>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button sx={{ margin: '0 10px' }} onClick={() => handleProcess(true)} variant='contained'>
                  승인
                </Button>
                <Button sx={{ margin: '0 10px' }} onClick={() => handleProcess(false)} variant='contained'>
                  거절
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
