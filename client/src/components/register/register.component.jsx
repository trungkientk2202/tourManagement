import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Box, ButtonBase } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WestIcon from '@mui/icons-material/West';

// project import
import Card from '../shared/card/card.component';
import AuthRegister from './register-form/register-form.component';
import { useDispatch, useSelector } from 'react-redux';
import { resendThunk } from '../../redux/auth/auth.slice';
import selectAuth from '../../redux/auth/auth.selectors';

const Register = () => {
    const dispatch = useDispatch();
    const { error } = useSelector(selectAuth);
    const [resend, setResend] = useState({});

    if (resend?.isSubmitted && !error) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Stack>
                    <Typography sx={{ fontWeight: 500, fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon sx={{ mr: 2 }} /> A Verify Link has been sent to your Email, Please confirm
                        before login.
                    </Typography>
                    <Typography component="p">
                        Don't receive any links.{' '}
                        <ButtonBase
                            onClick={() => {
                                dispatch(resendThunk({ email: resend?.email }));
                            }}>
                            resend
                        </ButtonBase>
                    </Typography>
                    <ButtonBase sx={{ justifyContent: 'flex-start', p: 2, px: 5 }} component={Link} to="/login">
                        <WestIcon sx={{ mr: 2 }} />
                        LogIn
                    </ButtonBase>
                </Stack>
            </Box>
        );
    }

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
                                                <Typography variant="h3">Sign up</Typography>
                                                <Typography
                                                    component={Link}
                                                    to="/login"
                                                    variant="body1"
                                                    sx={{ textDecoration: 'none' }}
                                                    color="primary">
                                                    Already have an account?
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthRegister setResend={setResend} />
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

export default Register;
