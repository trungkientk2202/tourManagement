import React from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = ({ component: Component = React.Fragment }) => (
  <>
    <Component>
      <Outlet />
    </Component>
  </>
);

export default BlankLayout;
