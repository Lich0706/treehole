import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { isSignedIn } from '@/utils/cookie';

function CreateMessage() {
  const navigate = useNavigate();

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
          <TextField label="Say something" multiline rows={18} fullWidth />
          <Button variant="contained" color="info" fullWidth>
            发表
          </Button>
        </Container>
      </Box>
    </Container>
  );
}

export default CreateMessage;
