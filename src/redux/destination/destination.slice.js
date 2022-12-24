import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as destinationService from '../../services/destination.service';

const initialValues = {
    destinationList: [],
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'destination',
    initialState: initialValues,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getDestinations.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getDestinations.fulfilled, (state, action) => {
                state.destinationList = action.payload;
                state.loading = false;
            })
            .addCase(getDestinations.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const getDestinations = createAsyncThunk('destination/list', async (_, { rejectWithValue }) => {
    try {
        const res = await destinationService.getDestinationList();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteDestinationThunk = createAsyncThunk(
    'destination/delete',
    async ({ id, action }, { rejectWithValue }) => {
        try {
            await destinationService.deleteDestination(id);
            action();
            return;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addDestinationThunk = createAsyncThunk(
    'destination/add',
    async ({ body, action }, { rejectWithValue }) => {
        try {
            await destinationService.addDestination(body);
            action();
            return;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const editDestinationThunk = createAsyncThunk(
    'destination/edit',
    async ({ body, action }, { rejectWithValue }) => {
        try {
            await destinationService.editDestination(body);
            action();
            return;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const { reducer } = authSlice;
export default reducer;