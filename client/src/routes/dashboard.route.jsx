import React from 'react';
import PrivateRoute from '../components/auth/private-route.component';

// project import
import loadable from '../components/shared/loadable/loadable.component';
import { URL_PATHS } from '../constants/routes.constant';
import DashboardLayout from '../layouts/dashboard.layout';

// render - login
const Dashboard = loadable(React.lazy(() => import('../components/dashboard/dashboard.component')));
const Evidence = loadable(React.lazy(() => import('../components/evidence/envidance.component')));
const Challan = loadable(React.lazy(() => import('../components/challan/challan.component')));
const Profile = loadable(React.lazy(() => import('../components/profile/profile.component')));

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
            element: <Dashboard />
        },
        {
            path: URL_PATHS.EVIDENCE,
            element: <Evidence />
        },
        {
            path: URL_PATHS.CHALLAN,
            element: <Challan />
        },
        {
            path: URL_PATHS.PROFILE,
            element: <Profile />
        }
    ]
};

export default AuthRoutes;
