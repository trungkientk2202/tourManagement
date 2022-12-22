import React from 'react';

// project import
import loadable from '../components/shared/loadable/loadable.component';
import { URL_PATHS } from '../constants/routes.constant';
import BlankLayout from '../layouts/blank.layout';

// render - login
const AuthLogin = loadable(React.lazy(() => import('../components/login/login.component')));
// const AuthRegister = loadable(React.lazy(() => import('../components/register/register.component')));
const ForgotPassword = loadable(React.lazy(() => import('../components/auth/forgot-password.component')));
const ResetPassword = loadable(React.lazy(() => import('../components/auth/reset-password.component')));
const VerifyEmail = loadable(React.lazy(() => import('../components/auth/verify-email.component')));

const AuthRoutes = {
    path: URL_PATHS.HOME,
    element: <BlankLayout />,
    children: [
        {
            path: URL_PATHS.LOGIN,
            element: <AuthLogin />
        },
        // {
        //     path: URL_PATHS.REGISTER,
        //     element: <AuthRegister />
        // },
        {
            path: URL_PATHS.FORGOT_PASSWORD,
            element: <ForgotPassword />
        },
        {
            path: `${URL_PATHS.RESET_PASSWORD}/:token`,
            element: <ResetPassword />
        },
        {
            path: `${URL_PATHS.VERIFY_EMAIL}`,
            element: <VerifyEmail />
        }
    ]
};

export default AuthRoutes;
