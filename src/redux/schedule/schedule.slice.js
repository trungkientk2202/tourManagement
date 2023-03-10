import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleService from '../../services/schedule.service';

const initialValues = {
    scheduleList: [],
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'schedule',
    initialState: initialValues,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getScheduleByTour.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getScheduleByTour.fulfilled, (state, action) => {
                state.scheduleList = action.payload;
                state.loading = false;
            })
            .addCase(getScheduleByTour.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const getSchedules = createAsyncThunk('schedule/list', async (_, { rejectWithValue }) => {
    try {
        const res = await scheduleService.getScheduleList();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getScheduleByTour = createAsyncThunk('schedule/byTour', async (tourId, { rejectWithValue }) => {
    try {
        const res = await scheduleService.getScheduleByTour(tourId);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const deleteScheduleThunk = createAsyncThunk('schedule/delete', async ({ id, action }, { rejectWithValue }) => {
    try {
        await scheduleService.deleteSchedule(id);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addScheduleThunk = createAsyncThunk('schedule/add', async ({ body, action }, { rejectWithValue }) => {
    try {
        await scheduleService.addSchedule(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editScheduleThunk = createAsyncThunk('schedule/edit', async ({ body, action }, { rejectWithValue }) => {
    try {
        await scheduleService.editSchedule(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer } = authSlice;
export default reducer;
