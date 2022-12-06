import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Box } from '@mui/material';

// project import
import Card from '../shared/card/card.component';
import AuthLogin from './components/auth-forms/auth-login.component';
import { useSelector } from 'react-redux';
import { LOCAL_STORAGE } from '../../constants/common.constant';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import * as localService from '../../services/local.service';

const Login = () => {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    useEffect(() => {
        const _currentUser = localService.getItem(LOCAL_STORAGE.currentUser);
        if (_currentUser && currentUser) navigate('/dashboard');
    }, [currentUser, navigate]);

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: '100vh'
                }}>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
                        }}>
                        <Grid item>
                            <Card
                                sx={{
                                    maxWidth: { xs: 400, lg: 475 },
                                    margin: { xs: 2.5, md: 3 },
                                    '& > *': {
                                        flexGrow: 1,
                                        flexBasis: '50%'
                                    }
                                }}
                                content={false}
                                border={false}
                                boxShadow
                                shadow={(theme) => theme.shadows[24]}>
                                <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="baseline"
                                                sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                                <Typography variant="h3">Login</Typography>
                                                <Typography
                                                    component={Link}
                                                    to="/register"
                                                    variant="body1"
                                                    sx={{ textDecoration: 'none' }}
                                                    color="primary">
                                                    Don&apos;t have an account?
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthLogin />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
