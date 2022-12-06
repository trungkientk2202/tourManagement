import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as mediaService from '../../services/media.service';
import {plateRecognize} from '../../services/recognize.service'

const initialValues = {
    media: null,
    loading: false,
    error: null
};

const mediaSlice = createSlice({
    name: 'media',
    initialState: initialValues,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(uploadMediaThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(uploadMediaThunk.fulfilled, (state, action) => {
                state.media = action.payload;
                state.loading = false;
            })
            .addCase(uploadMediaThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

const uploadMediaThunk = createAsyncThunk('media/upload', async (body, { dispatch, rejectWithValue }) => {
    try {
        const res = await mediaService.uploadMedia(body);
        console.log(res.data);
        return res.data?.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const httpPlateRecognize = async (body) => {
    const res = await plateRecognize(body);
    console.log(res)
    return await res
};
const { reducer } = mediaSlice;
export { uploadMediaThunk, httpPlateRecognize };
export default reducer;
