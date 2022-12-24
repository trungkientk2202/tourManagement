import React, { useEffect } from 'react';
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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Tab, Tabs, TextField, Button, IconButton, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';
import { getScheduleByTour } from '../../../redux/schedule/schedule.slice';
import { getUserByTour, searchThunk } from '../../../redux/user/user.slice';
import { useState } from 'react';

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

const TourDetail = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const scheduleList = useSelector((state) => state.schedule.scheduleList);
    const { user, userList } = useSelector((state) => state.user);
    const { tourId } = useParams();
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows1, setRows1] = useState([]);
    const [rowModesModel1, setRowModesModel1] = useState({});
    const [tab, setTab] = useState(0);
    const [open1, setOpen1] = useState(false);
    const [sdt, setSdt] = useState();

    const handleClickOpenUser = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleChange = (event, newValue) => {
        setTab(newValue);
        if (tab === 1) dispatch(getUserByTour());
        // else if (tab === 0) dispatch(getUserManagers());
    };

    useEffect(() => {
        dispatch(getScheduleByTour(tourId));
        dispatch(getUserByTour(tourId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 1 - planned, 2 - on going, 3 - fulfilled
    useEffect(() => {
        const temp = scheduleList?.map((_v, index) => ({
            id: `${_v?.id.maTour}${_v?.id.maDiaDiem}${_v?.id.sttLichTrinh}` ?? index,
            destinationId: _v?.diaDiem?.maDiaDiem,
            ordinal: _v?.id.sttLichTrinh,
            destination: _v?.diaDiem?.tenDiaDiem,
            content: _v?.noiDungLichTrinh ?? '',
            status: _v?.trangThai,
            startedDatetime: _v?.thoiGianBatDau ?? ''
        }));
        setRows([...temp]);
    }, [scheduleList]);

    useEffect(() => {
        const temp =
            userList?.map((_v, index) => ({
                id: _v?.khachHang?.sdt ?? index,
                name: _v?.khachHang?.ten,
                phoneNumber: _v?.khachHang.sdt,
                sex: _v?.khachHang?.phai,
                birth: _v?.khachHang?.ngaySinh ?? '',
                zalo: _v?.khachHang?.zalo ?? ''
            })) ?? [];
        setRows1([...temp]);
    }, [userList]);

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
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

    return (
        <div>
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
            </Paper>

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
                        {typeof user !== 'undefined' && user ? (
                            <>
                                <Avatar>A</Avatar>
                                <Box sx={{ ml: 2 }}>
                                    <Typography sx={{ fontWeight: 'bold' }}>name</Typography>
                                    <Typography>sdt</Typography>
                                </Box>
                            </>
                        ) : (
                            <Typography sx={{ color: '#e13102' }}>Not Found</Typography>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1}>Cancel</Button>
                    <Button onClick={handleClose1} variant={'contained'} disabled={true}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TourDetail;
