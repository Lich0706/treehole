// import { getRandomJoke } from './utils';
import { Link } from 'react-router-dom';

import ProfileIcon from '@mui/icons-material/AccountCircle';
import ThemeIcon from '@mui/icons-material/DarkMode';
import CreateIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { title } from '@/config';
// import useHotKeysDialog from '@/store/hotkeys';
// import useNotifications from '@/store/notifications';
// import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

// import { useState } from 'react';

function Header() {
  // const [, sidebarActions] = useSidebar();
  const [, themeActions] = useTheme();

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // const [, notificationsActions] = useNotifications();
  // const [, hotKeysDialogActions] = useHotKeysDialog();

  // function showNotification() {
  //   notificationsActions.push({
  //     options: {
  //       // Show fully customized notification
  //       // Usually, to show a notification, you'll use something like this:
  //       // notificationsActions.push({ message: ... })
  //       // `message` accepts string as well as ReactNode
  //       // But you also can use:
  //       // notificationsActions.push({ options: { content: ... } })
  //       // to show fully customized notification
  //       content: (
  //         <Alert severity="info">
  //           <AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
  //           {getRandomJoke()}
  //         </Alert>
  //       ),
  //     },
  //   });
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <Button component={Link} to="/" color="info">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#0288d1' }}>
                {title}
              </Typography>
            </Button>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#0288d1" }}>
              {title}
            </Typography> */}
          </FlexBox>
          <FlexBox>
            {/* <FlexBox>
              <Tooltip title="Hot keys" arrow>
                <HotKeysButton
                  size="small"
                  variant="outlined"
                  aria-label="open hotkeys dialog"
                  onClick={hotKeysDialogActions.open}
                >
                  alt + /
                </HotKeysButton>
              </Tooltip>
            </FlexBox>
            <Divider orientation="vertical" flexItem /> */}
            {isLoggedIn && (
              <IconButton color="info" edge="end" size="large" component={Link} to="/create">
                <CreateIcon />
              </IconButton>
            )}
            {isLoggedIn && <Divider orientation="vertical" flexItem />}
            <IconButton color="info" edge="end" size="large" onClick={themeActions.toggle}>
              <ThemeIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            {isLoggedIn ? (
              <IconButton color="info" edge="end" size="large">
                <ProfileIcon />
              </IconButton>
            ) : (
              <IconButton color="info" edge="end" size="large" component={Link} to="/signup">
                <PersonAddIcon />
              </IconButton>
            )}
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
