import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SpeedIcon from '@mui/icons-material/Speed';
import CameraIcon from '@mui/icons-material/Camera';
import { URL_PATHS } from '../../../constants/routes.constant';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const menuList1 = [
    {
        name: 'Home',
        icon: <SpeedIcon />,
        link: URL_PATHS.HOME + URL_PATHS.DASHBOARD
    },
    {
        name: 'Envidance',
        icon: <ShowChartIcon />,
        link: URL_PATHS.HOME + URL_PATHS.EVIDENCE
    },
    {
        name: 'Challan Details',
        icon: <CameraIcon />,
        link: URL_PATHS.HOME + URL_PATHS.CHALLAN
    }
];
const menuList2 = [
    {
        name: 'Profile',
        icon: <PersonIcon />,
        link: '/profile'
    }
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`
    }
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default function MiniDrawer({ open, handleDrawerClose }) {
    const theme = useTheme();

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuList1.map((text, index) => (
                    <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                        <Link to={text?.link}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center'
                                    }}>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {menuList2.map((text, index) => (
                    <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                        <Link to={text?.link}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center'
                                    }}>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
