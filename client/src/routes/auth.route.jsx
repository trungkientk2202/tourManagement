import React from 'react';

// project import
import loadable from '../components/shared/loadable/loadable.component';
import { URL_PATHS } from '../constants/routes.constant';
import BlankLayout from '../layouts/blank.layout';

// render - login
const AuthLogin = loadable(React.lazy(() => import('../components/login/login.component')));

const AuthRoutes = {
  path: URL_PATHS.HOME,
  element: <BlankLayout />,
  children: [
    {
      path: URL_PATHS.LOGIN,
      element: <AuthLogin />,
    },
  ],
};

export default AuthRoutes;
