import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
import { getViolationThunk } from '../../redux/media/media.slice';
import Table from '../shared/table/table.component';

const Evidence = () => {
    const dispatch = useDispatch();
    const violations = useSelector((state) => state.media.violations);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});

    useEffect(() => {
        dispatch(getViolationThunk());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const temp = violations.map((_v, index) => ({
            id: _v?.vehicle?.id ?? index,
            eventType: _v?.fault?.name ?? '',
            time: _v?.time ?? new Date().toLocaleString(),
            vehicleNumber: _v?.vehicle?.licensePlate ?? '',
            vehicleType: _v?.vehicle?.type ?? '',
            fine: _v?.fault?.chargeMoney ?? 0
        }));
        setRows([...temp]);
    }, [violations]);

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

    const columns = [
        { field: 'eventType', headerName: 'Event Type', width: 180, editable: true },
        {
            field: 'time',
            headerName: 'Time',
            type: 'dateTime',
            width: 220,
            editable: true
        },
        { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 250, editable: true },
        { field: 'vehicleType', headerName: 'Vehicle Type', width: 220, editable: true },
        { field: 'fine', headerName: 'Fine (VND)', width: 180, editable: true },
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
                    setRows={setRows}
                    rowModesModel={rowModesModel}
                    setRowModesModel={setRowModesModel}
                    processRowUpdate={processRowUpdate}
                />
            </Paper>
        </div>
    );
};

export default Evidence;
