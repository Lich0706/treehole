// import AddTaskIcon from '@mui/icons-material/AddTask';
// import BugReportIcon from '@mui/icons-material/BugReport';
import CreateIcon from '@mui/icons-material/Edit';
import ForestIcon from '@mui/icons-material/Forest';
import QuizIcon from '@mui/icons-material/Quiz';

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
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Page 1',
    icon: QuizIcon,
  },
  [Pages.CreateMessage]: {
    component: asyncComponentLoader(() => import('@/pages/CreateMessage')),
    path: '/create',
    title: '创建',
    icon: CreateIcon,
  },
};

export default routes;
