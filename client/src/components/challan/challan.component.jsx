import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMediaThunk } from '../../redux/media/media.slice';
import Media from './components/media/media.component';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MEDIA_TYPE } from '../../constants/common.constant';
import {
    Divider,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Typography
} from '@mui/material';
import { East, RestartAlt } from '@mui/icons-material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import io from 'socket.io-client';
import { isEmpty } from 'lodash';
const socket = io.connect(`${process.env.REACT_APP_SERVER_API_PATH}`);

const Challan = () => {
    const imageRef = useRef(null);
    const formRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [media, setMedia] = useState();
    const [challan, setChallan] = useState({ type: 1, accept: 'image/*' });
    const dispatch = useDispatch();
    const { loading, vehicle } = useSelector((state) => state.media);

    useEffect(() => {
        if (formRef.current && !isEmpty(vehicle)) {
            formRef.current.setFieldValue('eventType', vehicle?.violation ?? '');
            formRef.current.setFieldValue('time', vehicle && new Date().toLocaleString());
            formRef.current.setFieldValue('vehicleNumber', vehicle?.vehicle?.licensePlate ?? '');
            formRef.current.setFieldValue('vehicleType', vehicle?.vehicle?.type ?? '');
        }
    }, [vehicle]);

    useEffect(() => {
        const handleStream = (data) => {
            console.log(data);
        };

        if (connected) {
            socket.on('stream', handleStream);
        }

        return () => socket.off('stream', handleStream);
    }, [connected]);

    const handleChangeFile = (e) => {
        e.preventDefault();
        const reader = new FileReader();

        reader.onload = () => {
            setMedia({
                origin: e.target.files[0],
                name: e.target.files[0].name,
                file: reader.result,
                type: MEDIA_TYPE[`${Object.keys(MEDIA_TYPE).find((k) => e.target.files[0].type.includes(k))}`]
            });
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        setMedia({
            name: e.target.files[0].name,
            type: MEDIA_TYPE[`${Object.keys(MEDIA_TYPE).find((k) => e.target.files[0].type.includes(k))}`]
        });
    };

    const handleDetect = () => {
        const formData = new FormData();
        formData.append('file', media?.origin);
        dispatch(uploadMediaThunk(formData));
    };

    return (
        <div>
            <Typography
                sx={{
                    position: 'relative',
                    mt: 1,
                    mb: 3,
                    fontSize: '1.5rem',
                    letterSpacing: 0.5
                }}>
                Challan
            </Typography>
            <Stack direction="row" spacing={5}>
                <Stack sx={{ flexGrow: 1 }} spacing={2}>
                    <Paper sx={{ p: 5 }}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="demo-simple-select">Detection Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={challan?.type}
                                        onChange={(e) => {
                                            const _type = e.target.value;
                                            let accept = '';
                                            switch (_type) {
                                                case 0:
                                                    setConnected(true);
                                                    setMedia({
                                                        name: 'Web Cam',
                                                        type: MEDIA_TYPE['image']
                                                    });
                                                    break;
                                                case 2:
                                                    accept = 'video/*';
                                                    break;
                                                default:
                                                    accept = 'image/*';
                                            }
                                            if (connected) setConnected(false);
                                            setChallan((prev) => ({ ...prev, type: _type, accept }));
                                            setMedia(null);
                                        }}>
                                        <MenuItem value={0}>Camera</MenuItem>
                                        <MenuItem value={1}>Image</MenuItem>
                                        <MenuItem value={2}>Video</MenuItem>
                                    </Select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <Divider textAlign="right">
                                        <Button
                                            loading={loading}
                                            variant="contained"
                                            endIcon={<East />}
                                            onClick={() => handleDetect()}>
                                            Detect
                                        </Button>
                                    </Divider>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
                        <Box sx={{ position: 'relative' }}>
                            <TextField
                                type="file"
                                onChange={handleChangeFile}
                                sx={{
                                    position: 'absolute',
                                    '&, & .MuiInputBase-root, & input': {
                                        boxSizing: 'border-box',
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 1
                                    },
                                    ' & input': {
                                        cursor: 'pointer',
                                        opacity: 0
                                    }
                                }}
                                inputProps={{ accept: challan?.accept }}
                            />
                            <Media
                                ref={imageRef}
                                media={media}
                                fallback={require('../../assets/images/add_image.png')}
                            />
                        </Box>
                        {/* <Box>
                            <Media
                                media={
                                    _media && {
                                        ..._media,
                                        file: process.env.REACT_APP_IMAGE_STATIC_PATH + `/${_media?.file}`
                                    }
                                }
                            />
                        </Box> */}
                    </Stack>
                </Stack>
                <Box sx={{ minWidth: 350 }}>
                    <Paper sx={{ p: 5 }}>
                        <>
                            <Formik
                                innerRef={formRef}
                                initialValues={{
                                    eventType: '',
                                    time: '',
                                    vehicleNumber: '',
                                    vehicleType: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    eventType: Yup.string().required('Event Type is required'),
                                    time: Yup.string().required('Time is required'),
                                    vehicleNumber: Yup.string().required('Vehicle Number is required'),
                                    vehicleType: Yup.string().required('Vehicle Type is required')
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
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    touched,
                                    values
                                }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Stack spacing={1} sx={{ mb: 2 }}>
                                            <InputLabel htmlFor="event-type">Event Type</InputLabel>
                                            <OutlinedInput
                                                id="event-type"
                                                type="text"
                                                value={values.eventType}
                                                name="eventType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Ex. Red Light Violation..."
                                                fullWidth
                                                error={Boolean(touched.eventType && errors.eventType)}
                                            />
                                            {touched.eventType && errors.eventType && (
                                                <FormHelperText error id="standard-weight-helper-text-event-type">
                                                    {errors.eventType}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        <Stack spacing={1} sx={{ mb: 2 }}>
                                            <InputLabel htmlFor="time">Time</InputLabel>
                                            <OutlinedInput
                                                id="time"
                                                type="text"
                                                value={values.time}
                                                name="eventType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder={`Ex. ${new Date().toLocaleString()}`}
                                                fullWidth
                                                error={Boolean(touched.time && errors.time)}
                                            />
                                            {touched.time && errors.time && (
                                                <FormHelperText error id="standard-weight-helper-text-time">
                                                    {errors.time}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        <Stack spacing={1} sx={{ mb: 2 }}>
                                            <InputLabel htmlFor="vehicle-number">Vehicle Number</InputLabel>
                                            <OutlinedInput
                                                id="vehicle-number"
                                                type="text"
                                                value={values.vehicleNumber}
                                                name="vehicleNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Ex. xx-xx xxxx..."
                                                fullWidth
                                                error={Boolean(touched.vehicleNumber && errors.vehicleNumber)}
                                            />
                                            {touched.vehicleNumber && errors.vehicleNumber && (
                                                <FormHelperText error id="standard-weight-helper-text-vehicle-number">
                                                    {errors.vehicleNumber}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        <Stack spacing={1} sx={{ mb: 2 }}>
                                            <InputLabel htmlFor="vehicle-type">Vehicle Type</InputLabel>
                                            <OutlinedInput
                                                id="vehicle-type"
                                                type="text"
                                                value={values.vehicleType}
                                                name="vehicleType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Ex. WAVE RSX..."
                                                fullWidth
                                                error={Boolean(touched.vehicleType && errors.vehicleType)}
                                            />
                                            {touched.vehicleType && errors.vehicleType && (
                                                <FormHelperText error id="standard-weight-helper-text-vehicle-type">
                                                    {errors.vehicleType}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        <Divider textAlign="right">
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                justifyContent={'flex-end'}
                                                sx={{ mt: 3 }}>
                                                <Button type="reset" endIcon={<RestartAlt />}>
                                                    Reset
                                                </Button>
                                            </Stack>
                                        </Divider>
                                    </form>
                                )}
                            </Formik>
                        </>
                    </Paper>
                </Box>
            </Stack>
        </div>
    );
};

export default Challan;
