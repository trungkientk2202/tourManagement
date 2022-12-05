import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../../redux/auth/auth.slice';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

function Header({ open, handleDrawerOpen }) {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logoutThunk());
    };

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ minHeight: 'unset' }}>
                <Stack flex={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                marginLeft: 0,
                                ...(open && { display: 'none' })
                            }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Intelligent Traffic Management System
                        </Typography>
                    </Stack>
                    <Button variant="text" sx={{ color: '#fff' }} onClick={handleLogOut}>
                        Log out <LogoutIcon sx={{ ml: 2 }} />
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default Header;
