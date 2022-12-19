import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header.component';
import Box from '@mui/material/Box';
import MiniDrawer, { DrawerHeader } from './components/drawer/drawer.component';

const DashboardLayout = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <MiniDrawer open={open} handleDrawerClose={handleDrawerClose} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, pl: 6, pr: 6 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
