import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadMediaThunk, httpPlateRecognize} from '../../redux/media/media.slice';
import Media from './components/media/media.component';
import selectMedia from '../../redux/media/media.selectors';
import { useSelector } from 'react-redux';

const Challan = () => {
    const [media, setMedia] = useState();
    const [plate, setPlate] = useState()
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

    const handleRecognize = async () => {
        const formData = new FormData();
        formData.append('file', media);
        const res = await httpPlateRecognize(formData);
        console.log(res)
        setPlate(res.data)
    };

    return (
        <div>
            <div>Challan</div>
            {plate && <div>
                <h4>Vehicle: </h4>
                <ul>
                    <li>Type: {plate.vehicle.type}</li>
                    <li>License Plate: {plate.plate}</li>
                </ul>
            </div>}
        
            <input type="file" onChange={handleChangeFile} />
            <button onClick={handleUpload}>Submit</button>
            <button onClick={handleRecognize}>Recognize</button>
            <Media media={_media} />
        </div>
    );
};

export default Challan;
