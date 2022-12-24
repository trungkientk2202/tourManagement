import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as tourService from '../../services/tour.service';

const initialValues = {
    tourList: [],
    tourTypeList: [],
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'tour',
    initialState: initialValues,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getTours.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getTours.fulfilled, (state, action) => {
                state.tourList = action.payload;
                state.loading = false;
            })
            .addCase(getTours.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getTourTypes.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getTourTypes.fulfilled, (state, action) => {
                state.tourTypeList = action.payload;
                state.loading = false;
            })
            .addCase(getTourTypes.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const getTours = createAsyncThunk('tour/list', async (_, { rejectWithValue }) => {
    try {
        const res = await tourService.getTourList();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getTourTypes = createAsyncThunk('tour/typeList', async (_, { rejectWithValue }) => {
    try {
        const res = await tourService.getTourTypeList();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const deleteTourThunk = createAsyncThunk('tour/delete', async ({ id, action }, { rejectWithValue }) => {
    try {
        await tourService.deleteTour(id);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addTourThunk = createAsyncThunk('tour/add', async ({ body, action }, { rejectWithValue }) => {
    try {
        await tourService.addTour(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editTourThunk = createAsyncThunk('tour/edit', async ({ body, action }, { rejectWithValue }) => {
    try {
        await tourService.editTour(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer } = authSlice;
export default reducer;
