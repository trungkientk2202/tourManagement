import React from 'react';
import {
    IconButton,
    Grid,
    Button,
    Stack,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormHelperText
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const ChangePasswordForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large">
                                                    {showPassword ? (
                                                        <VisibilityOutlinedIcon />
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
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
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large">
                                                    {showConfirmPassword ? (
                                                        <VisibilityOutlinedIcon />
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
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
    );
};

export default ChangePasswordForm;
