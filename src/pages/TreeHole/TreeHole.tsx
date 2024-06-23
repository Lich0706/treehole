import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import axios from 'axios';

import MessageList from '@/components/MessageList';
import SearchBar from '@/components/SearchBar';
import { API_BASE_URL } from '@/config/config';
import { getCookie, isSignedIn } from '@/utils/cookie';

export interface PostItem {
  ID: number;
  Content: string;
  CreatedAt: string;
}

function TreeHole() {
  const signedIn = isSignedIn();

  const [allPosts, setAllPosts] = useState<PostItem[]>([]);
  const [searchResults, setSearchResults] = useState<PostItem[]>([]);

  const handleSearch = (term: string) => {
    if (term === '') {
      setSearchResults(allPosts);
    } else {
      if (allPosts !== null) {
        const results = allPosts.filter(
          (item) =>
            item.Content.toLowerCase().includes(term.toLowerCase()) ||
            item.ID.toString().includes(term),
        );
        setSearchResults(results);
      }
    }
  };

  const getAllPosts = () => {
    axios
      .get(`${API_BASE_URL}/post/list`, {
        headers: { token: getCookie('token') },
      })
      .then(
        (response) => {
          console.log(response.data);
          setAllPosts(response.data.data);
          setSearchResults(response.data.data);
        },
        (error) => {
          console.log('[DEBUG] TODO', error);
        },
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
