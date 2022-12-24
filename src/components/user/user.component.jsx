import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../shared/table/table.component';
import {
    Button,
    Box,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    FormControlLabel,
    Select,
    MenuItem
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import {
    addUserManagerThunk,
    addUserThunk,
    deleteUserThunk,
    editUserManagerThunk,
    editUserThunk,
    getRolesThunk,
    getUserManagers,
    getUsers
} from '../../redux/user/user.slice';

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

const Tour = () => {
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const userList = useSelector((state) => state.user.userList);
    const roleList = useSelector((state) => state.user.roleList);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [tab, setTab] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(null);
    const [row, setRow] = React.useState(null);

    const handleChange = (event, newValue) => {
        setTab(newValue);
        if (tab === 1) dispatch(getUsers());
        else if (tab === 0) dispatch(getUserManagers());
    };
    const handleClose = () => {
        setOpen(false);
        setMode(null);
        formRef.current.resetForm();
    };
    const handleClickOpen = () => {
        setOpen(true);
        setMode('add');
    };

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getRolesThunk());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 1 - planned, 2 - on going, 3 - fulfilled
    useEffect(() => {
        const temp = userList.map((_v, index) => ({
            id: _v?.sdt ?? index,
            name: _v?.ten,
            phoneNumber: _v?.sdt,
            sex: _v?.phai,
            birth: _v?.ngaySinh ?? '',
            zalo: _v?.zalo ?? '',
            role: _v?.loaiTaiKhoan?.tenLoaiTK ?? ''
        }));
        setRows([...temp]);
    }, [userList]);

    useEffect(() => {
        if (formRef.current) {
            if (!isEmpty(row)) {
                formRef.current.setFieldValue('name', row?.name ?? '');
                formRef.current.setFieldValue('phoneNumber', row?.phoneNumber);
                formRef.current.setFieldValue('sex', row?.sex ?? '');
                formRef.current.setFieldValue('zalo', row?.zalo ?? '');
                formRef.current.setFieldValue('birth', dayjs(row?.birth ?? ''));
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
        // setRows(rows.filter((row) => row.id !== id));
        if (window.confirm('Are you sure!') === true) {
            if (tab === 0) dispatch(deleteUserThunk({ id: id, action: () => dispatch(getUsers()) }));
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

    const columns = [
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
                User List
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
                            columns={columns}
                            rows={rows}
                            setRows={setRows}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                            processRowUpdate={processRowUpdate}
                            handleClickOpen={handleClickOpen}
                        />
                    </Paper>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Paper>
                        <Table
                            columns={[
                                ...columns,
                                {
                                    field: 'role',
                                    headerName: 'Role',
                                    width: 180,
                                    editable: true
                                }
                            ]}
                            rows={rows}
                            setRows={setRows}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                            processRowUpdate={processRowUpdate}
                            handleClickOpen={handleClickOpen}
                        />
                    </Paper>
                </TabPanel>
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
                                name: '',
                                phoneNumber: '',
                                sex: '',
                                birth: new Date().toLocaleString(),
                                zalo: '',
                                ...(tab === 1 && { role: '' })
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().max(255).required('Destination is required'),
                                phoneNumber: Yup.string().max(10).required('Phone Number is required'),
                                birth: Yup.string().required('Birth is required'),
                                sex: Yup.string().required('Sex is required'),
                                zalo: Yup.string().max(10),
                                ...(tab === 1 && { role: Yup.string().required('Role is required') })
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (mode === 'add' && tab === 0)
                                        dispatch(
                                            addUserThunk({
                                                body: {
                                                    sdt: values.phoneNumber,
                                                    ten: values.name,
                                                    matKhau: '12345',
                                                    phai: values.sex,
                                                    ngaySinh: values.birth,
                                                    zalo: values.zalo
                                                },
                                                action: () => dispatch(getUsers())
                                            })
                                        );
                                    else if (mode === 'add' && tab === 1) {
                                        dispatch(
                                            addUserManagerThunk({
                                                body: {
                                                    sdt: values.phoneNumber,
                                                    ten: values.name,
                                                    matKhau: '12345',
                                                    phai: values.sex,
                                                    ngaySinh: values.birth,
                                                    zalo: values.zalo,
                                                    maLoaiTaiKhoan: values.role
                                                },
                                                action: () => dispatch(getUserManagers())
                                            })
                                        );
                                    } else if (mode === 'edit' && tab === 1) {
                                        dispatch(
                                            editUserManagerThunk({
                                                body: {
                                                    id: row.id,
                                                    sdt: values.phoneNumber,
                                                    ten: values.name,
                                                    matKhau: '12345',
                                                    phai: values.sex,
                                                    ngaySinh: values.birth,
                                                    zalo: values.zalo,
                                                    maLoaiTaiKhoan: values.role
                                                },
                                                action: () => dispatch(getUserManagers())
                                            })
                                        );
                                    } else if (mode === 'edit' && tab === 0)
                                        dispatch(
                                            editUserThunk({
                                                body: {
                                                    id: row.id,
                                                    sdt: values.phoneNumber,
                                                    ten: values.name,
                                                    matKhau: '12345',
                                                    phai: values.sex,
                                                    ngaySinh: values.birth,
                                                    zalo: values.zalo
                                                },
                                                action: () => dispatch(getUsers())
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
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="name">Name</InputLabel>
                                                <OutlinedInput
                                                    id="name"
                                                    type="text"
                                                    value={values.name}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter name"
                                                    fullWidth
                                                    error={Boolean(touched.name && errors.name)}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                                                <OutlinedInput
                                                    id="phoneNumber"
                                                    type="text"
                                                    value={values.phoneNumber}
                                                    name="phoneNumber"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter phoneNumber"
                                                    fullWidth
                                                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                                />
                                                {touched.phoneNumber && errors.phoneNumber && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.phoneNumber}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="sex">Sex</InputLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    id="sex"
                                                    name="sex"
                                                    value={values.sex}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}>
                                                    <FormControlLabel
                                                        value={false}
                                                        control={<Radio />}
                                                        label="Female"
                                                    />
                                                    <FormControlLabel value={true} control={<Radio />} label="Male" />
                                                </RadioGroup>
                                                {touched.sex && errors.sex && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.sex}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="birth">Date of birth</InputLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        renderInput={(props) => <TextField {...props} />}
                                                        id="birth"
                                                        value={dayjs(values.birth)}
                                                        onBlur={handleBlur}
                                                        name="birth"
                                                        onChange={(newValue) =>
                                                            handleChange({
                                                                target: { name: 'birth', value: newValue }
                                                            })
                                                        }
                                                    />
                                                </LocalizationProvider>
                                                {touched.birth && errors.birth && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.birth}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="zalo">Zalo</InputLabel>
                                                <OutlinedInput
                                                    id="zalo"
                                                    type="text"
                                                    value={values.zalo}
                                                    name="zalo"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter zalo"
                                                    fullWidth
                                                    error={Boolean(touched.zalo && errors.zalo)}
                                                />
                                                {touched.zalo && errors.zalo && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.zalo}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                        {errors.submit && (
                                            <Grid item xs={12}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Grid>
                                        )}
                                        {tab === 1 && (
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="role">Role</InputLabel>
                                                    <Select
                                                        id="role"
                                                        value={values.role}
                                                        onBlur={handleBlur}
                                                        name="role"
                                                        onChange={handleChange}>
                                                        {roleList?.map((_r) => {
                                                            return (
                                                                <MenuItem key={_r.maLoaiTK} value={_r.maLoaiTK}>
                                                                    {_r.tenLoaiTK}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                    {touched.role && errors.role && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login">
                                                            {errors.role}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
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
