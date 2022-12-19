import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Media = ({ media, fallback }, ref) => {
    console.log(media);

    return (
        <Paper sx={{ width: '100%', height: '500px' }}>
            {media?.name && (
                <Typography
                    component="p"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        padding: 3,
                        wordBreak: 'break-all',
                        whiteSpace: 'normal'
                    }}>
                    {media?.name}
                </Typography>
            )}
            <Box
                ref={ref}
                component={media?.type ?? 'img'}
                sx={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain' }}
                src={media?.file || fallback || require('../../../../assets/images/no_image.png')}
                alt="Challan"
                controls
            />
        </Paper>
    );
};

export default React.forwardRef(Media);
