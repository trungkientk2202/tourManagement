import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/user.service';

const initialValues = {
    userList: [],
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialValues,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getUserByTour.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getUserByTour.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(getUserByTour.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getUserManagers.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getUserManagers.fulfilled, (state, action) => {
                state.userList = action.payload;
                state.loading = false;
            })
            .addCase(getUserManagers.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const getUsers = createAsyncThunk('user/list', async (_, { rejectWithValue }) => {
    try {
        const res = await userService.getUserList();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getUserManagers = createAsyncThunk('user/managerList', async (_, { rejectWithValue }) => {
    try {
        const res = await userService.getUserManagerList();
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getUserByTour = createAsyncThunk('user/byTour', async (tourId, { rejectWithValue }) => {
    try {
        const res = await userService.getUserByTour(tourId);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer } = userSlice;
export default reducer;
