import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  TreeHole,
  CreateMessage,
  SignUp,
  LogIn,
  UserProfile,
  DetailPost,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
