import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from 'src/recoil/states';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { selectedBoardItem } from 'src/recoil/table';
import { sessionState } from 'src/recoil/user';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '3px',
  borderTop: '5px solid blue',
  pt: 2,
  px: 4,
  pb: 3
};

export default function CustomModal() {
  const [modalRC, setModalRC] = useRecoilState(modalState);
  const selectedBoardItemRC = useRecoilValue(selectedBoardItem);
  const sessionStateRC = useRecoilValue(sessionState);

  const handleClose = () => {
    setModalRC(prev => ({
      ...prev,
      open: false
    }));
  };

  const handleApply = () => {
    const params = {
      boardNo: selectedBoardItemRC.boardNo,
      applicantEmail: sessionStateRC.email,
      message: modalRC.message
    };
    console.log(params);
  };

  return (
    <div>
      <Modal
        open={modalRC.open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '20px 0' }}>
            {modalRC.type === 'invite' ? '시합초청' : modalRC.type === 'recruit' ? '팀원모집' : '대관정보'}
          </Box>
          <Box>
            {modalRC.type === 'invite'
              ? '초청을 위해 팀명/인원수/유니폼/실력 등 상세내용을 기입하시면 초청에 도움이 됩니다.'
              : modalRC.type === 'recruit'
              ? '성별/나이/신장/몸무게/포지션 등 상세내용을 입력해주세요.'
              : modalRC.type === 'rental'
              ? '대관하려는 팀의 상세 내용을 기입해주세요.'
              : null}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <Input
              placeholder='신청 내용'
              value={modalRC.message}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setModalRC(prev => ({
                  ...prev,
                  message: event.target.value
                }));
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <Button onClick={() => handleApply()} variant='contained'>
              신청하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
