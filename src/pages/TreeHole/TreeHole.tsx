import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MessageList from '@/components/MessageList';
import SearchBar from '@/components/SearchBar';
import { isSignedIn } from '@/utils/cookie';

interface DataItem {
  pid: number;
  content: string;
  date: string;
}

const data: DataItem[] = [
  { pid: 1, content: 'This is the first #2 content', date: '2024-06-01' },
  { pid: 2, content: 'This is the second content', date: '2024-06-01' },
  { pid: 3, content: 'Another content here', date: '2024-06-01' },
  // More content...
];

function TreeHole() {
  const signedIn = isSignedIn();

  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (term: string) => {
    if (term === '') {
      setSearchResults(data);
    } else {
      const results = data.filter(
        (item) =>
          item.content.toLowerCase().includes(term.toLowerCase()) ||
          item.pid.toString().includes(term),
      );
      setSearchResults(results);
    }
  };

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          pt: 4,
          pb: 4,
        }}
      >
        {signedIn ? (
          <Container>
            <SearchBar onSearch={handleSearch} onRefresh={() => console.log('refresh')} />
            <Box sx={{ paddingTop: 4 }} />
            <MessageList results={searchResults} />
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
