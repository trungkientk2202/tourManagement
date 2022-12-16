import React from 'react';
import { Box, Grid, Button, Stack, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPasswordThunk } from '../../redux/auth/auth.slice';

const ResetPassword = () => {
    const token = useParams();
    const dispatch = useDispatch();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <>
                <Formik
                    initialValues={{
                        password: '123456',
                        confirmPassword: '123456'
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string().max(255).min(3).required('Password is required'),
                        confirmPassword: Yup.string()
                            .required()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            dispatch(
                                resetPasswordThunk({
                                    token,
                                    password: values.password,
                                    confirmpassword: values.confirmPassword
                                })
                            );
                            setStatus({ success: false });
                            setSubmitting(false);
                        } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }}>
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel required htmlFor="password-login">
                                            Password
                                        </InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="-password-login"
                                            type={'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter password"
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel required htmlFor="confirm-password">
                                            Confirm Password
                                        </InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                            id="confirm-password"
                                            type={'password'}
                                            value={values.confirmPassword}
                                            name="confirmPassword"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter password"
                                        />
                                        {touched.confirmPassword && errors.confirmPassword && (
                                            <FormHelperText
                                                error
                                                id="standard-weight-helper-text-confirmPassword-login">
                                                {errors.confirmPassword}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack direction={'row'} justifyContent={'flex-end'} sx={{ mt: 5 }} spacing={2}>
                                        <Button
                                            disabled={isSubmitting}
                                            size="large"
                                            type="reset"
                                            variant="outlined"
                                            color="primary">
                                            Reset
                                        </Button>
                                        <Button
                                            disabled={isSubmitting}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary">
                                            Save
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </>
        </Box>
    );
};

export default ResetPassword;
