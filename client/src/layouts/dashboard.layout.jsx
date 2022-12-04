import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header.component';

const DashboardLayout = () => {
  const theme = useTheme();

  return (
    <Container maxWidth={false} sx={{ padding: { sm: 0 }, backgroundColor: theme.palette.grey[0] }}>
      <Header />
      <div style={{ height: '2000px', backgroundColor: theme.palette.grey[200] }}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
