import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMediaThunk } from '../../redux/media/media.slice';
import Media from './components/media/media.component';
import selectMedia from '../../redux/media/media.selectors';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MEDIA_TYPE } from '../../constants/common.constant';

const Challan = () => {
    const [media, setMedia] = useState();
    const _media = useSelector(selectMedia);
    const dispatch = useDispatch();

    const handleChangeFile = (e) => {
        e.preventDefault();
        const reader = new FileReader();

        reader.onload = () => {
            setMedia({
                name: e.target.files[0].name,
                file: reader.result,
                type: MEDIA_TYPE[`${Object.keys(MEDIA_TYPE).find((k) => e.target.files[0].type.includes(k))}`]
            });
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        setMedia({
            name: e.target.files[0].name,
            type: MEDIA_TYPE[`${Object.keys(MEDIA_TYPE).find((k) => e.target.files[0].type.includes(k))}`]
        });
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', media);
        dispatch(uploadMediaThunk(formData));
    };

    return (
        <div>
            <div>Challan</div>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        type="file"
                        onChange={handleChangeFile}
                        sx={{
                            position: 'absolute',
                            '&, & .MuiInputBase-root, & input': {
                                boxSizing: 'border-box',
                                width: '100%',
                                height: '100%',
                                zIndex: 1
                            },
                            ' & input': {
                                cursor: 'pointer',
                                opacity: 0
                            }
                        }}
                    />
                    <Media media={media} fallback={require('../../assets/images/add_image.png')} />
                </Box>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={handleUpload}>Detect</Button>
                </ButtonGroup>
                <Box>
                    <Media
                        media={
                            _media && { ..._media, file: process.env.REACT_APP_IMAGE_STATIC_PATH + `/${_media?.file}` }
                        }
                    />
                </Box>
            </Stack>
        </div>
    );
};

export default Challan;
