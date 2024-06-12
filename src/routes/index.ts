// import AddTaskIcon from '@mui/icons-material/AddTask';
// import BugReportIcon from '@mui/icons-material/BugReport';
import CreateIcon from '@mui/icons-material/Edit';
import ForestIcon from '@mui/icons-material/Forest';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// import TerrainIcon from '@mui/icons-material/Terrain';
import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.TreeHole]: {
    component: asyncComponentLoader(() => import('@/pages/TreeHole')),
    path: '/',
    title: '树洞',
    icon: ForestIcon,
  },
  [Pages.SignUp]: {
    component: asyncComponentLoader(() => import('@/pages/SignUp')),
    path: '/signup',
    title: '注册',
    icon: PersonAddIcon,
  },
  [Pages.LogIn]: {
    component: asyncComponentLoader(() => import('@/pages/LogIn')),
    path: '/login',
    title: '登录',
  },
  [Pages.CreateMessage]: {
    component: asyncComponentLoader(() => import('@/pages/CreateMessage')),
    path: '/create',
    title: '创建',
    icon: CreateIcon,
  },
  [Pages.UserProfile]: {
    component: asyncComponentLoader(() => import('@/pages/UserProfile')),
    path: '/userprofile',
    title: '我的',
  },
  [Pages.DetailPost]: {
    component: asyncComponentLoader(() => import('@/pages/DetailMessage')),
    path: '/post/:pid',
    title: '帖子',
  },
};

export default routes;
