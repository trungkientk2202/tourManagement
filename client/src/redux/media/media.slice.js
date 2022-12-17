import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as mediaService from '../../services/media.service';

const initialValues = {
    media: null,
    vehicle: null,
    violations: [],
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
            })
            .addCase(getViolationThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getViolationThunk.fulfilled, (state, action) => {
                state.violations = action.payload;
                state.loading = false;
            })
            .addCase(getViolationThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(detectThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(detectThunk.fulfilled, (state, action) => {
                state.vehicle = action.payload;
                state.loading = false;
            })
            .addCase(detectThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

const uploadMediaThunk = createAsyncThunk('media/upload', async (body, { dispatch, rejectWithValue }) => {
    try {
        const res = await mediaService.uploadMedia(body);
        const { file } = res.data?.data;
        dispatch(detectThunk({ file }));
        return res.data?.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const detectThunk = createAsyncThunk('media/detect', async (body, { dispatch, rejectWithValue }) => {
    try {
        const res = await mediaService.detect(body);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const getViolationThunk = createAsyncThunk('media/violations', async (_, { dispatch, rejectWithValue }) => {
    try {
        const res = await mediaService.getViolations();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer } = mediaSlice;
export { uploadMediaThunk, detectThunk, getViolationThunk };
export default reducer;
