import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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
import CancelIcon from '@mui/icons-material/Close';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../shared/table/table.component';
import {
    addDestinationThunk,
    deleteDestinationThunk,
    editDestinationThunk,
    getDestinations
} from '../../redux/destination/destination.slice';
import { Tooltip, Button, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
    const destinationList = useSelector((state) => state.destination.destinationList);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(null);
    const [row, setRow] = React.useState(null);

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
        dispatch(getDestinations());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 1 - planned, 2 - on going, 3 - fulfilled
    useEffect(() => {
        const temp = destinationList.map((_v, index) => ({
            id: _v?.maDiaDiem ?? index,
            name: _v?.tenDiaDiem ?? '',
            description: _v?.moTa ?? '',
            country: _v?.tinhThanh ?? ''
        }));
        setRows([...temp]);
    }, [destinationList]);

    useEffect(() => {
        if (formRef.current) {
            if (!isEmpty(row)) {
                formRef.current.setFieldValue('name', row?.name ?? '');
                formRef.current.setFieldValue('description', row?.description ?? '');
                formRef.current.setFieldValue('country', row?.country ?? '');
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
            dispatch(deleteDestinationThunk({ id: id, action: () => dispatch(getDestinations()) }));
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
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'description',
            headerName: 'Description',
            width: 550,
            editable: true,
            renderCell: (params) => {
                return (
                    <Tooltip title={params.value}>
                        <Typography>{params.value.slice(0, Math.floor(Math.random() * 21) + 50) + '...'}</Typography>
                    </Tooltip>
                );
            }
        },
        { field: 'country', headerName: 'Country (Vietnam)', width: 220, editable: true },
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
                Destination List
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
                                name: '',
                                description: '',
                                country: ''
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().max(255).required('Destination is required'),
                                country: Yup.string().max(255).required('Phone Number is required')
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (mode === 'add')
                                        dispatch(
                                            addDestinationThunk({
                                                body: {
                                                    tenDiaDiem: values.name,
                                                    moTa: values.description,
                                                    tinhThanh: values.country
                                                },
                                                action: () => dispatch(getDestinations())
                                            })
                                        );
                                    else if (mode === 'edit')
                                        dispatch(
                                            editDestinationThunk({
                                                body: {
                                                    id: row.id,
                                                    tenDiaDiem: values.name,
                                                    moTa: values.description,
                                                    tinhThanh: values.country
                                                },
                                                action: () => dispatch(getDestinations())
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
                                                <InputLabel htmlFor="country">Country</InputLabel>
                                                <OutlinedInput
                                                    id="country"
                                                    type="text"
                                                    value={values.country}
                                                    name="country"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter country"
                                                    fullWidth
                                                    error={Boolean(touched.country && errors.country)}
                                                />
                                                {touched.country && errors.country && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.country}
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
