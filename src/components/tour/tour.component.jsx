import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../shared/table/table.component';
import { getTourTypes, getTours } from '../../redux/tour/tour.slice';
import { Avatar, Box, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { styled } from '@mui/material/styles';
import { isEmpty } from 'lodash';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, fontSize: '1.25rem' }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const Tour = () => {
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const tourList = useSelector((state) => state.tour.tourList);
    const tourTypeList = useSelector((state) => state.tour.tourTypeList);
    const [rows, setRows] = React.useState([]);
    const [row, setRow] = React.useState(null);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(null);

    useEffect(() => {
        dispatch(getTours());
        dispatch(getTourTypes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 1 - planned, 2 - on going, 3 - fulfilled
    useEffect(() => {
        const temp = tourList.map((_v, index) => ({
            id: _v?.maTour ?? index,
            destination: _v?.diemDen ?? '',
            image: _v?.image ?? '',
            description: _v?.moTa ?? '',
            startingPoint: _v?.diemDi ?? '',
            price: _v?.gia ?? 0,
            tourTypeId: _v?.loaiTour?.maLoaiTour ?? '',
            tourType: _v?.loaiTour?.tenLoaiTour ?? '',
            status: _v?.trangThai,
            startedDate: _v?.ngayBatDau ?? ''
        }));
        setRows([...temp]);
    }, [tourList]);

    useEffect(() => {
        if (formRef.current) {
            if (!isEmpty(row)) {
                formRef.current.setFieldValue('destination', row?.destination ?? '');
                formRef.current.setFieldValue('image', row?.image);
                formRef.current.setFieldValue('startingPoint', row?.startingPoint ?? '');
                formRef.current.setFieldValue('price', row?.price ?? 0);
                formRef.current.setFieldValue('description', row?.description ?? 0);
                formRef.current.setFieldValue('tourType', row?.tourTypeId ?? '');
                formRef.current.setFieldValue('status', row?.status ?? '');
                formRef.current.setFieldValue('startedDate', dayjs(row?.startedDate ?? ''));
            } else {
                formRef.current.resetForm();
            }
        }
    }, [row]);

    const handleEditClick = (id) => () => {
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        setOpen(true);
        setMode('edit');
        const _row = rows.find((_t) => _t.id === id);
        setRow(_row);
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true }
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
        setMode('add');
        if (row) setRow(null);
    };

    const columns = [
        {
            field: 'destination',
            headerName: 'Destination',
            width: 180,
            editable: true,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={params.row.image} variant="rounded" />
                        <Link to={'/tour/' + params.row.id}>{params.value}</Link>
                    </Box>
                );
            }
        },
        {
            field: 'startedDate',
            headerName: 'Started Date',
            type: 'dateTime',
            width: 220,
            editable: true
        },
        { field: 'description', headerName: 'Description', width: 250, editable: true },
        { field: 'startingPoint', headerName: 'Starting Point', width: 220, editable: true },
        { field: 'price', headerName: 'Price (VND)', width: 180, editable: true },
        { field: 'tourType', headerName: 'Type Of Tour', width: 180, editable: true },
        { field: 'status', headerName: 'Status', width: 180, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem key={id} icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
                        <GridActionsCellItem
                            key={id}
                            icon={<CloseIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

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
                Tour List
            </Typography>
            <Accordion sx={{ px: 5 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Stack direction={'row'} alignItems={'center'}>
                        <SearchIcon sx={{ fontSize: '1.25rem', mr: 2 }} />
                        <Typography sx={{ fontSize: '0.875rem' }}>Search</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Paper sx={{ mt: 5 }}>
                <Table
                    columns={columns}
                    rows={rows}
                    rowModesModel={rowModesModel}
                    setRowModesModel={setRowModesModel}
                    processRowUpdate={processRowUpdate}
                    handleClickOpen={handleClickOpen}
                />
            </Paper>

            <BootstrapDialog
                onClose={handleClose}
                open={true}
                aria-labelledby="customized-dialog-title"
                sx={{ display: open ? 'block' : 'none' }}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {mode === 'add' ? 'Add Tour' : 'Edit Tour'}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <>
                        <Formik
                            innerRef={formRef}
                            initialValues={{
                                destination: '',
                                image: '',
                                description: '',
                                startingPoint: '',
                                price: 0,
                                tourType: '',
                                status: 1,
                                startedDate: new Date().toLocaleString()
                            }}
                            validationSchema={Yup.object().shape({
                                destination: Yup.string().max(255).required('Destination is required'),
                                price: Yup.string().max(255).required('Price is required'),
                                tourType: Yup.string().required('Tour Type is required'),
                                startedDate: Yup.string().required('Started Date is required')
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
                                                <InputLabel htmlFor="image">Image</InputLabel>
                                                <OutlinedInput
                                                    id="image"
                                                    type="text"
                                                    value={values.image}
                                                    name="image"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter image"
                                                    fullWidth
                                                    error={Boolean(touched.image && errors.image)}
                                                />
                                                {touched.image && errors.image && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.image}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="destination">Destination</InputLabel>
                                                <OutlinedInput
                                                    id="destination"
                                                    type="text"
                                                    value={values.destination}
                                                    name="destination"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter destination"
                                                    fullWidth
                                                    error={Boolean(touched.destination && errors.destination)}
                                                />
                                                {touched.destination && errors.destination && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.destination}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="startingPoint">Starting Point</InputLabel>
                                                <OutlinedInput
                                                    id="startingPoint"
                                                    type="text"
                                                    value={values.startingPoint}
                                                    name="startingPoint"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter startingPoint"
                                                    fullWidth
                                                    error={Boolean(touched.startingPoint && errors.startingPoint)}
                                                />
                                                {touched.startingPoint && errors.startingPoint && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.startingPoint}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="price">Price</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.price && errors.price)}
                                                    id="price"
                                                    type={'number'}
                                                    value={values.price}
                                                    name="price"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter price"
                                                />
                                                {touched.price && errors.price && (
                                                    <FormHelperText error id="standard-weight-helper-text-price-login">
                                                        {errors.price}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="description">Description</InputLabel>
                                                <OutlinedInput
                                                    id="description"
                                                    type="text"
                                                    value={values.description}
                                                    name="description"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter description"
                                                    fullWidth
                                                    error={Boolean(touched.description && errors.description)}
                                                />
                                                {touched.description && errors.description && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.description}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="tourType">Tour Type</InputLabel>
                                                <Select
                                                    id="tourType"
                                                    value={values.tourType}
                                                    name="tourType"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}>
                                                    {tourTypeList.map((_tt) => {
                                                        return (
                                                            <MenuItem key={_tt.maLoaiTour} value={_tt.maLoaiTour}>
                                                                {_tt.tenLoaiTour}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                                {touched.tourType && errors.tourType && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.tourType}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="status">Status</InputLabel>
                                                <Select
                                                    id="status"
                                                    value={values.status}
                                                    onBlur={handleBlur}
                                                    name="status"
                                                    disabled={mode === 'add'}
                                                    onChange={handleChange}>
                                                    <MenuItem value={1}>Planned</MenuItem>
                                                    <MenuItem value={2}>On Going</MenuItem>
                                                    <MenuItem value={3}>Fulfilled</MenuItem>
                                                </Select>
                                                {touched.status && errors.status && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.status}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="startedDate">Started Date</InputLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        renderInput={(props) => <TextField {...props} />}
                                                        id="startedDate"
                                                        value={dayjs(values.startedDate)}
                                                        onBlur={handleBlur}
                                                        name="startedDate"
                                                        onChange={(newValue) =>
                                                            handleChange({
                                                                target: { name: 'startedDate', value: newValue }
                                                            })
                                                        }
                                                    />
                                                </LocalizationProvider>
                                                {touched.startedDate && errors.startedDate && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.startedDate}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                        {errors.submit && (
                                            <Grid item xs={12}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Grid>
                                        )}
                                        <Grid item xs={12}>
                                            <Stack direction="row" justifyContent={'flex-end'} spacing={2}>
                                                <Button autoFocus onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary">
                                                    Save Changes
                                                </Button>
                                            </Stack>
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Login with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
};

export default Tour;
