import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Message from '@/components/Message';
import SearchBar from '@/components/SearchBar';
import { isSignedIn } from '@/utils/cookie';

function TreeHole() {
  const signedIn = isSignedIn();

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        {signedIn ? (
          <Container>
            <SearchBar />
            <Message />
          </Container>
        ) : (
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              六度树洞
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              戴上面具，卸下防备
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              在匿名的树洞里，做回真实的自己
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" color="info" component={Link} to="/signup">
                登录注册
              </Button>
              <Button variant="outlined" color="info">
                了解更多
              </Button>
            </Stack>
          </Container>
        )}
      </Box>
    </Container>
  );
}

export default TreeHole;
