import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import axios from 'axios';

import Toast from '@/components/Toast/Toast';
import { API_BASE_URL } from '@/config/config';
import { getCookie, isSignedIn } from '@/utils/cookie';

function CreateMessage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    if (content.trim() != '') {
      var postData = {
        content: content,
      };

      let axiosConfig = {
        headers: {
          token: getCookie('token'),
        },
      };
      axios
        .post(`${API_BASE_URL}/post/create`, postData, axiosConfig)
        .then((res) => {
          console.log('RESPONSE RECEIVED: ', res);
          // TODO: Toast Success
          setMessage('发表成功！');
          setSeverity('success');
          setOpen(true);

          navigate('/');
        })
        .catch((err) => {
          console.log('AXIOS ERROR: ', err);
          // TODO: Toast Error
          setMessage(err);
          setSeverity('error');
          setOpen(true);
        });
    }
  };

  useEffect(() => {
    const isLoggedIn = isSignedIn();
    if (!isLoggedIn) {
      navigate('/');
      location.reload();
    }
  }, [navigate]);

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          pt: 6,
          pb: 6,
        }}
      >
        <Container>
          <TextField label="Say something" multiline rows={18} fullWidth onChange={handleChange} />
          <Button variant="contained" color="info" fullWidth onClick={handleSubmit}>
            发表
          </Button>
        </Container>
      </Box>
      <Toast open={open} message={message} severity={severity} handleClose={handleClose} />
    </Container>
  );
}

export default CreateMessage;
