import React, { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography, Box, Paper, InputLabel, Stack, OutlinedInput, Button, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPasswordThunk } from '../../redux/auth/auth.slice';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [isSubmitted, setSubmitted] = useState(false);

    const handleForgotPassword = () => {
        dispatch(forgotPasswordThunk({ email }));
        setSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Stack>
                    <Typography sx={{ fontWeight: 500, fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon sx={{ mr: 2 }} /> A Link has been sent to your Email, Please check your inbox.
                    </Typography>
                    <Typography component="p">
                        Don't recicive any mails. <ButtonBase>resend</ButtonBase>
                    </Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper sx={{ minWidth: 768, p: 5 }} elevation="6">
                <Typography
                    component={'h2'}
                    sx={{ fontWeight: 500, fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                    <Link
                        to="/login"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginRight: 5,
                            fontSize: '0.875rem',
                            color: '#ccc'
                        }}>
                        <WestIcon sx={{ mr: 2 }} />
                        Back to Login |
                    </Link>
                    Forgot Password
                </Typography>
                <Typography>Please, provide your email then we will send you a link to reset your password.</Typography>
                <Stack spacing={1} sx={{ mt: 5 }}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                        id="email-login"
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        fullWidth
                        required
                    />
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button endIcon={<EastIcon />} variant="contained" onClick={handleForgotPassword}>
                        Next
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;
