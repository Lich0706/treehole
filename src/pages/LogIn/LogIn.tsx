import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import axios from 'axios';

import { API_BASE_URL } from '@/config/config';
import { setCookies } from '@/utils/cookie';

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useTheme from '@/store/theme';

export default function LogIn() {
  const navigate = useNavigate();
  const [openError, setOpenError] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    // console.log(userInfo);
    axios.post(`${API_BASE_URL}/user/auth`, userInfo).then(
      (response) => {
        console.log(response);
        setCookies({
          token: response.data.token,
          username: response.data.username,
        });
        navigate('/');
        //location.reload();
      },
      //   error => {
      //     console.log("error")
      // }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'currentColor' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: (theme) => theme.palette.info.main }}>
          登录
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="邮箱"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} color="info">
            登录
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="/signup"
                variant="body2"
                sx={{ color: (theme) => theme.palette.info.main }}
              >
                暂无账号？创建
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          登陆错误：检查邮箱和密码
        </Alert>
      </Snackbar>
    </Container>
  );
}
