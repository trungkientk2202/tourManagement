import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { LOCAL_STORAGE } from '../../constants/common.constant';
// import * as localService from '../../services/local.service';
// import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const { children } = props;
    // const _session = localService.getCookie(LOCAL_STORAGE.session);
    // const location = useLocation();

    // if (!_session) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }

    return <>{children}</>;
};

export default PrivateRoute;
