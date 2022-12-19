import React from 'react';
import { Avatar, Box, Grid, Typography, Paper } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PasswordIcon from '@mui/icons-material/Password';
import ChangePasswordForm from './components/profile-forms/change-password.component';
import { useTheme } from '@mui/material/styles';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { useSelector } from 'react-redux';

const Profile = () => {
    const theme = useTheme();
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Box>
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: `url(${require('../../assets/images/profile_bg.png')})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    minHeight: 250,
                    borderRadius: 5,
                    border: `1px solid ${theme.palette.primary.main}`
                }}>
                <Avatar
                    sx={{
                        position: 'absolute',
                        bottom: -45,
                        left: 55,
                        bgcolor: deepPurple[500],
                        transform: 'scale(2)',
                        border: '2px solid #fff',
                        boxSizing: 'content-box'
                    }}>
                    Ad
                </Avatar>
                <Box sx={{ position: 'absolute', bottom: 0, left: 125, transform: 'translateY(120%)' }}>
                    <Typography component={'h4'} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        Administrator
                    </Typography>
                    {currentUser && <Typography component={'p'}>{currentUser?.email}</Typography>}
                </Box>
            </Box>
            <Box>
                <Grid
                    container
                    sx={{
                        justifyContent: 'space-around',
                        mt: 25,
                        borderTop: `1px solid ${theme.palette.primary.main}`,
                        pt: 5
                    }}>
                    <Grid item xs={3}>
                        <Paper>
                            <List
                                sx={{ width: '100%', maxWidth: 360 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        My Account
                                    </ListSubheader>
                                }>
                                <ListItemButton>
                                    <ListItemIcon sx={{ mr: 2 }}>
                                        <PasswordIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Change password" />
                                </ListItemButton>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper sx={{ p: 5 }}>
                            <Typography sx={{ pb: 5, fontSize: '1.25rem', fontWeight: 600 }}>
                                Change your current password
                            </Typography>
                            <ChangePasswordForm />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Profile;
