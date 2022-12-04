import React from 'react';
import PrivateRoute from '../components/auth/private-route.component';

// project import
import loadable from '../components/shared/loadable/loadable.component';
import { URL_PATHS } from '../constants/routes.constant';
import DashboardLayout from '../layouts/dashboard.layout';

// render - login
const Dashboard = loadable(React.lazy(() => import('../components/dashboard/dashboard.component')));

const AuthRoutes = {
  path: URL_PATHS.HOME,
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: URL_PATHS.DASHBOARD,
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
  ],
};

export default AuthRoutes;
