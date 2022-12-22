import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { LOCAL_STORAGE } from '../../constants/common.constant';
import * as localService from '../../services/local.service';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';

const PrivateRoute = (props) => {
    const { children } = props;
    const _accessToken = localService.getItem(LOCAL_STORAGE.accessToken);
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();

    useEffect(() => {}, [currentUser]);

    if (!_accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
