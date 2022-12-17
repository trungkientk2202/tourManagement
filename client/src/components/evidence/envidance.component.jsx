import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { alpha, useTheme } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, GridRowModes, GridToolbar } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomId } from '@mui/x-data-grid-generator';

const initialRows = [
    {
        id: randomId(),
        eventType: 'Red Light Violation Detection',
        time: randomCreatedDate(),
        vehicleNumber: 'XY00ZZ1122',
        vehicleType: 'Wave RSX',
        fine: '900,000'
    },
    {
        id: randomId(),
        eventType: 'Red Light Violation Detection',
        time: randomCreatedDate(),
        vehicleNumber: 'AB00CC1122',
        vehicleType: 'AB',
        fine: '200,000'
    },
    {
        id: randomId(),
        eventType: 'Red Light Violation Detection',
        time: randomCreatedDate(),
        vehicleNumber: 'AA12BB2233',
        vehicleType: 'Car',
        fine: '2,000,000'
    },
    {
        id: randomId(),
        eventType: 'Red Light Violation Detection',
        time: randomCreatedDate(),
        vehicleNumber: 'BC11BB2233',
        vehicleType: 'SH',
        fine: '750,000'
    },
    {
        id: randomId(),
        eventType: 'Red Light Violation Detection',
        time: randomCreatedDate(),
        vehicleNumber: 'AA11BB2234',
        vehicleType: 'Wave alpha',
        fine: '500,000'
    }
];

const Evidence = () => {
    const theme = useTheme();
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

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
                Evidences
            </Typography>
            <Accordion sx={{ px: 5 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Stack direction={'row'} alignItems={'center'}>
                        <SearchIcon sx={{ fontSize: '1.5rem', mr: 2 }} />
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
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        sx={{
                            fontSize: '0.875rem',
                            '& .MuiDataGrid-footerContainer': {
                                position: 'relative',
                                justifyContent: 'flex-end'
                            },
                            '& .MuiTablePagination-root': { overflow: 'hidden', mr: 5 },
                            '& .MuiDataGrid-selectedRowCount': {
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                m: 0,
                                backgroundColor: alpha(theme.palette.primary.light, 0.25),
                                pl: 5
                            },
                            '& .actions': {
                                color: 'text.secondary'
                            },
                            '& .textPrimary': {
                                color: 'text.primary'
                            }
                        }}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        components={{
                            Toolbar: GridToolbar
                        }}
                        componentsProps={{
                            toolbar: { setRows, setRowModesModel }
                        }}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 50]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </Paper>
        </div>
    );
};

export default Evidence;
