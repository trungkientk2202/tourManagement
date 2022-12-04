import { useRoutes } from 'react-router-dom';
import AuthRoutes from './auth.route';
import DashboardRoutes from './dashboard.route';

const Routes = () => {
  return useRoutes([DashboardRoutes, AuthRoutes]);
};

export default Routes;
