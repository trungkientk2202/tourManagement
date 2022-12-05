import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LOCAL_STORAGE } from '../../constants/common.constant';
import * as localService from '../../services/local.service';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { useEffect } from 'react';

const PrivateRoute = (props) => {
    const { children } = props;
    const _currentUser = localService.getItem(LOCAL_STORAGE.currentUser);
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();

    useEffect(() => {}, [currentUser]);

    if (!_currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
