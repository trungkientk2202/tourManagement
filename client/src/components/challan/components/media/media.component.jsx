import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Media = ({ media }) => {
    return (
        <Paper sx={{ width: '30%', height: '600px' }}>
            <Box
                component={media?.type ?? 'img'}
                sx={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain' }}
                src={process.env.REACT_APP_IMAGE_STATIC_PATH + `/${media?.file ?? ''}`}
                alt="Challan"
                controls
            />
        </Paper>
    );
};

export default Media;
