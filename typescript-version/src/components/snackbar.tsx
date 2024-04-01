import * as React from 'react'
import Box from '@mui/material/Box'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { useRecoilState } from 'recoil'
import { snackbarState } from 'src/recoil/states'

export default function CustomSnackbar() {
  const [snackbar, setSnackbarState] = useRecoilState(snackbarState)

  const handleClose = () => {
    setSnackbarState(prev => ({
      ...prev,
      open: false,
      message: ''
    }))
  }

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbar.open}
        onClose={handleClose}
        message={snackbar.message}
      />
    </Box>
  )
}
