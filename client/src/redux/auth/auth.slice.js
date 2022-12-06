import { LOCAL_STORAGE } from '../../constants/common.constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/auth.service';
import * as localService from '../../services/local.service';

const initialValues = {
    currentUser: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialValues,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload;
        },
        removeUser(state) {
            state.currentUser = null;
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMeThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getMeThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            .addCase(getMeThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logInThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logInThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(logInThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.currentUser = null;
                state.loading = false;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

const getMeThunk = createAsyncThunk('auth/getMe', async (_, { dispatch, rejectWithValue }) => {
    try {
        const res = await authService.loadUser();
        localService.setItem(LOCAL_STORAGE.currentUser, JSON.stringify(res.data?.data));
        return res.data?.data;
    } catch (error) {
        localService.removeItem(LOCAL_STORAGE.currentUser);
        return rejectWithValue(error);
    }
});

const logInThunk = createAsyncThunk('auth/logIn', async (body, { dispatch, rejectWithValue }) => {
    try {
        const res = await authService.logIn(body);
        console.log(res);
        // -----------
        dispatch(getMeThunk());
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
    try {
        await authService.logout();
        // -----------
        localService.removeItem(LOCAL_STORAGE.currentUser);
        dispatch(removeUser());
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer, actions } = authSlice;
export const { setUser, removeUser } = actions;
export { getMeThunk, logInThunk, logoutThunk };
export default reducer;
