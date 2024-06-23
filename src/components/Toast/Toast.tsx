// Toast.tsx
import React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface ToastProps {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  handleClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
