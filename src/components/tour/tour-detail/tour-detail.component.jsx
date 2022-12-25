import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import WestIcon from '@mui/icons-material/West';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../shared/table/table.component';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box,
    Divider,
    Tab,
    Tabs,
    TextField,
    Button,
    IconButton,
    Avatar,
    Grid,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';
import {
    addScheduleThunk,
    deleteScheduleThunk,
    editScheduleThunk,
    getScheduleByTour,
    getSchedules
} from '../../../redux/schedule/schedule.slice';
import { getDestinations } from '../../../redux/destination/destination.slice';
import { getUserByTour, getUserManagerByTour, searchThunk } from '../../../redux/user/user.slice';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { participateTour } from '../../../services/tour.service';
import { participateTourThunk } from '../../../redux/tour/tour.slice';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`
    };
}

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
                    <CancelIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const status = {
    1: { name: 'Undone', color: '#107c10' },
    2: { name: 'Doing', color: '#ffac00' },
    3: { name: 'Done', color: '#e13102' }
};

const TourDetail = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const formRef = React.useRef(null);
    const scheduleList = useSelector((state) => state.schedule.scheduleList);
    const destinationList = useSelector((state) => state.destination.destinationList);
    const { user, userList } = useSelector((state) => state.user);
    const { tourId } = useParams();
    const [rows, setRows] = useState([]);
    const [row, setRow] = React.useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows1, setRows1] = useState([]);
    const [rowModesModel1, setRowModesModel1] = useState({});
    const [tab, setTab] = useState(0);
    const [open1, setOpen1] = useState(false);
    const [sdt, setSdt] = useState();
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(null);

    const handleClickOpenUser = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleChange = (event, newValue) => {
        setTab(newValue);
        if (tab === 1) dispatch(getUserByTour(tourId));
        else if (tab === 0) dispatch(getUserManagerByTour(tourId));
    };

    useEffect(() => {
        dispatch(getScheduleByTour(tourId));
        dispatch(getUserByTour(tourId));
        dispatch(getDestinations());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 1 - planned, 2 - on going, 3 - fulfilled
    useEffect(() => {
        const temp =
            scheduleList?.map((_v, index) => ({
                id: `${_v?.id.maTour}/${_v?.id.maDiaDiem}/${_v?.id.sttLichTrinh}` ?? index,
                destinationId: _v?.diaDiem?.maDiaDiem,
                ordinal: _v?.id.sttLichTrinh,
                destination: _v?.diaDiem?.tenDiaDiem,
                content: _v?.noiDungLichTrinh ?? '',
                status: _v?.trangThai,
                startedDatetime: _v?.thoiGianBatDau ?? ''
            })) ?? [];
        setRows([...temp]);
    }, [scheduleList]);

    useEffect(() => {
        console.log(formRef.current);
        if (formRef.current) {
            if (!isEmpty(row)) {
                formRef.current.setFieldValue('ordinal', row?.ordinal ?? '');
                formRef.current.setFieldValue('destination', row?.destination);
                formRef.current.setFieldValue('content', row?.content ?? '');
                formRef.current.setFieldValue('status', row?.status ?? 0);
                formRef.current.setFieldValue('startedDatetime', dayjs(row?.startedDatetime ?? ''));
            }
        } else {
            if (!isEmpty(row)) setRow({ ...row });
        }
    }, [row]);

    useEffect(() => {
        const temp =
            userList?.map((_v, index) => ({
                id: _v?.khachHang?.sdt ?? _v?.taiKhoan?.sdt ?? index,
                name: _v?.khachHang?.ten ?? _v?.taiKhoan?.ten,
                phoneNumber: _v?.khachHang?.sdt ?? _v?.taiKhoan.sdt,
                sex: _v?.khachHang?.phai ?? _v?.taiKhoan?.phai,
                birth: _v?.khachHang?.ngaySinh ?? _v?.taiKhoan?.ngaySinh ?? '',
                zalo: _v?.khachHang?.zalo ?? _v?.taiKhoan?.zalo ?? '',
                role: _v?.taiKhoan?.loaiTaiKhoan?.tenLoaiTK ?? ''
            })) ?? [];
        setRows1([...temp]);
    }, [userList]);

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
        // setRows(rows.filter((row) => row.id !== id));
        if (window.confirm('Are you sure!') === true) {
            dispatch(deleteScheduleThunk({ id: id, action: () => dispatch(getSchedules()) }));
        }
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

    const columns1 = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            editable: true
        },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 250, editable: true },
        {
            field: 'sex',
            headerName: 'Sex',
            width: 180,
            editable: true,
            renderCell: (params) => {
                return <Typography>{params.value ? 'Male' : 'Female'}</Typography>;
            }
        },
        {
            field: 'birth',
            headerName: 'Date Of Birth',
            type: 'date',
            width: 220,
            editable: true
        },
        { field: 'zalo', headerName: 'Zalo', width: 180, editable: true },
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
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    const columns = [
        {
            field: 'ordinal',
            headerName: 'Ordinal Numbers',
            width: 120,
            editable: true
        },
        { field: 'destination', headerName: 'Destination', width: 250, editable: true },
        { field: 'content', headerName: 'What To Do', width: 280, editable: true },
        { field: 'status', headerName: 'Status', width: 150, editable: true },
        {
            field: 'startedDatetime',
            headerName: 'Started Date/Time',
            type: 'dateTime',
            width: 220,
            editable: true
        },
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
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    const handleClose = () => {
        setOpen(false);
        setMode(null);
        setRow(null);
        formRef.current.resetForm();
    };
    const handleClickOpen = () => {
        setOpen(true);
        setMode('add');
    };

    return (
        <>
            <div>
                <BootstrapDialog
                    onClose={handleClose}
                    open={open}
                    aria-labelledby="customized-dialog-title"
                    sx={{ display: open ? 'block' : 'none' }}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {mode === 'add' ? 'Add Schedule' : 'Edit Schedule'}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <>
                            <Formik
                                innerRef={formRef}
                                initialValues={{
                                    ordinal: '',
                                    destination: '',
                                    content: '',
                                    status: '',
                                    startedDatetime: new Date().toLocaleString()
                                }}
                                validationSchema={Yup.object().shape({
                                    ordinal: Yup.string().max(255).required('Ordinal Number is required'),
                                    destination: Yup.string().required('Destination is required'),
                                    content: Yup.string().required('Content is required'),
                                    status: Yup.string().required('Status is required'),
                                    startedDatetime: Yup.string().required('Started Date is required')
                                })}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    try {
                                        if (mode === 'add')
                                            dispatch(
                                                addScheduleThunk({
                                                    body: {
                                                        maTour: tourId,
                                                        maDiaDiem: values.destination,
                                                        sttLichTrinh: values.ordinal,
                                                        noiDungLichTrinh: values.content,
                                                        thoiGianBatDau: values.startedDatetime,
                                                        trangThai: values.status
                                                    },
                                                    action: () => dispatch(getSchedules())
                                                })
                                            );
                                        else if (mode === 'edit')
                                            dispatch(
                                                editScheduleThunk({
                                                    body: {
                                                        id: row.id,
                                                        noiDungLichTrinh: values.content,
                                                        thoiGianBatDau: values.startedDatetime,
                                                        trangThai: values.status
                                                    },
                                                    action: () => dispatch(getSchedules())
                                                })
                                            );
                                        handleClose();
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
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="ordinal">Ordinal Number</InputLabel>
                                                    <OutlinedInput
                                                        id="ordinal"
                                                        type="number"
                                                        value={values.ordinal}
                                                        name="ordinal"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter ordinal"
                                                        fullWidth
                                                        error={Boolean(touched.ordinal && errors.ordinal)}
                                                    />
                                                    {touched.ordinal && errors.ordinal && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login">
                                                            {errors.ordinal}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="destination">Destination</InputLabel>
                                                    <Select
                                                        id="destination"
                                                        value={values.destination}
                                                        name="destination"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}>
                                                        {destinationList?.map((_tt) => {
                                                            return (
                                                                <MenuItem key={_tt.maDiaDiem} value={_tt.maLoaiTour}>
                                                                    {_tt.tenDiaDiem}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                    {touched.destination && errors.destination && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login">
                                                            {errors.destination}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="content">Content</InputLabel>
                                                    <OutlinedInput
                                                        id="content"
                                                        type="text"
                                                        value={values.content}
                                                        name="content"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter content"
                                                        fullWidth
                                                        error={Boolean(touched.content && errors.content)}
                                                    />
                                                    {touched.content && errors.content && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login">
                                                            {errors.content}
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
                                                        onChange={handleChange}>
                                                        <MenuItem value={1}>Not Started</MenuItem>
                                                        <MenuItem value={2}>Started</MenuItem>
                                                        <MenuItem value={3}>Done</MenuItem>
                                                    </Select>
                                                    {touched.status && errors.status && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login">
                                                            {errors.status}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="startedDatetime">Started Date</InputLabel>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker
                                                            renderInput={(props) => <TextField {...props} />}
                                                            id="startedDatetime"
                                                            value={dayjs(values.startedDatetime)}
                                                            onBlur={handleBlur}
                                                            name="startedDatetime"
                                                            onChange={(newValue) =>
                                                                handleChange({
                                                                    target: { name: 'startedDatetime', value: newValue }
                                                                })
                                                            }
                                                        />
                                                    </LocalizationProvider>
                                                    {touched.startedDatetime && errors.startedDatetime && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login">
                                                            {errors.startedDatetime}
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
                                        </Grid>
                                    </form>
                                )}
                            </Formik>
                        </>
                    </DialogContent>
                </BootstrapDialog>

                <Link to={'/tour'} style={{ textDecoration: 'none', color: theme.palette.grey[800] }}>
                    <Stack direction={'row'} alignItems="center">
                        <WestIcon sx={{ mr: 2 }} />
                        <Typography
                            sx={{
                                position: 'relative',
                                mt: 1,
                                mb: 3,
                                fontSize: '1.5rem',
                                letterSpacing: 0.5
                            }}>
                            Tour Detail
                        </Typography>
                    </Stack>
                </Link>

                <Stack sx={{ mt: 5 }}>
                    <Paper>
                        <Divider textAlign="left">
                            <Typography component={'h4'} sx={{ fontSize: '1.25rem', mb: 3 }}>
                                Schedule
                            </Typography>
                        </Divider>
                        <Table
                            columns={columns}
                            rows={rows}
                            setRows={setRows}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                            processRowUpdate={processRowUpdate}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'ordinal', sort: 'asc' }]
                                }
                            }}
                            handleClickOpen={handleClickOpen}
                        />
                    </Paper>
                </Stack>
                <Paper sx={{ width: '100%', mt: 5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Customer" {...a11yProps(0)} />
                            <Tab label="Manager" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tab} index={0}>
                        <Paper>
                            <Table
                                columns={columns1}
                                rows={rows1}
                                setRows={setRows}
                                rowModesModel={rowModesModel1}
                                setRowModesModel={setRowModesModel}
                                processRowUpdate={processRowUpdate}
                                handleClickOpen={handleClickOpenUser}
                            />
                        </Paper>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Paper>
                            <Table
                                columns={[
                                    ...columns1,
                                    {
                                        field: 'role',
                                        headerName: 'Role',
                                        width: 180,
                                        editable: true
                                    }
                                ]}
                                rows={rows1}
                                setRows={setRows}
                                rowModesModel={rowModesModel1}
                                setRowModesModel={setRowModesModel}
                                processRowUpdate={processRowUpdate}
                                handleClickOpen={handleClickOpenUser}
                            />
                        </Paper>
                    </TabPanel>
                </Paper>

                {open1 && (
                    <Dialog open={open1} onClose={handleClose1}>
                        <DialogTitle>Add User</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ pr: 35 }}>
                                To Add a User the Tour, PLease Search and Add!
                            </DialogContentText>
                            <Box sx={{ position: 'relative' }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="sdt"
                                    name={'sdt'}
                                    value={sdt}
                                    onChange={(e) => setSdt(e.target.value)}
                                    label="Phone Number"
                                    fullWidth
                                    variant="standard"
                                />
                                <IconButton
                                    aria-label="search"
                                    onClick={() => dispatch(searchThunk(sdt))}
                                    sx={{ position: 'absolute', bottom: 10, right: 15 }}>
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                            <Stack sx={{ mt: 2 }} direction="row" alignItems={'center'}>
                                {typeof user !== 'undefined' ? (
                                    user ? (
                                        <>
                                            <Avatar>A</Avatar>
                                            <Box sx={{ ml: 2 }}>
                                                <Typography sx={{ fontWeight: 'bold' }}>{user.ten}</Typography>
                                                <Typography>{user.sdt}</Typography>
                                            </Box>
                                        </>
                                    ) : (
                                        <Typography sx={{ color: '#e13102' }}>Not Found</Typography>
                                    )
                                ) : (
                                    <></>
                                )}
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose1}>Cancel</Button>
                            <Button
                                onClick={() => {
                                    if (tab === 0)
                                        dispatch(
                                            participateTourThunk({
                                                body: {
                                                    maTour: tourId,
                                                    sdt: sdt,
                                                    checkIn: true,
                                                    ghiChu: null,
                                                    diemHen: null,
                                                    vitri: null
                                                },
                                                action: () => dispatch(getUserByTour())
                                            })
                                        );
                                    else if (tab === 0) {
                                    }
                                }}
                                variant={'contained'}
                                disabled={Boolean(user)}>
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </>
    );
};

export default TourDetail;
