import React from 'react';
import { useLocation } from 'react-router-dom';
import { LOCAL_STORAGE } from '../../constants/common.constant';
import * as localService from '../../services/local.service';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { children } = props;
  const _accessToken = localService.getItem(LOCAL_STORAGE.accessToken);
  const location = useLocation();

  if (!_accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
