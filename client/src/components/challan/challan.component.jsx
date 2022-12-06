import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadMediaThunk } from '../../redux/media/media.slice';
import Media from './components/media/media.component';
import selectMedia from '../../redux/media/media.selectors';
import { useSelector } from 'react-redux';

const Challan = () => {
    const [media, setMedia] = useState();
    const _media = useSelector(selectMedia);
    const dispatch = useDispatch();

    const handleChangeFile = (e) => {
        e.preventDefault();
        setMedia(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', media);
        dispatch(uploadMediaThunk(formData));
    };

    return (
        <div>
            <div>Challan</div>
            <input type="file" onChange={handleChangeFile} />
            <button onClick={handleUpload}>Submit</button>
            <Media media={_media} />
        </div>
    );
};

export default Challan;
