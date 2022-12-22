import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import { alpha, useTheme } from '@mui/material/styles';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';

function EditToolbar(props) {
    const { handleClickOpen } = props;

    return (
        <GridToolbarContainer>
            <Stack direction="row" justifyContent="space-between" flexGrow={1} sx={{ pr: 5 }}>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                    Add record
                </Button>
                <GridToolbar />
            </Stack>
        </GridToolbarContainer>
    );
}

const Table = (props) => {
    const {
        columns,
        rows,
        rowModesModel,
        setRowModesModel,
        processRowUpdate,
        getDetailPanelContent,
        getDetailPanelHeight,
        initialState,
        handleClickOpen
    } = props;
    const theme = useTheme();

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    return (
        <div>
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
                        Toolbar: EditToolbar
                    }}
                    componentsProps={{
                        toolbar: { handleClickOpen }
                    }}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    rowThreshold={0}
                    experimentalFeatures={{ newEditingApi: true }}
                    getDetailPanelHeight={getDetailPanelHeight}
                    getDetailPanelContent={getDetailPanelContent}
                    initialState={initialState}
                />
            </Box>
        </div>
    );
};

export default Table;
