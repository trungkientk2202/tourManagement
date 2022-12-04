import { LOCAL_STORAGE } from '../../constants/common.constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/auth.service';
// import { openToast } from '@features/toast/toast.slice';
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
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(loginThunk.rejected, (state, action) => {
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
        return res.data;
    } catch (error) {
        localService.removeItem(LOCAL_STORAGE.accessToken);
        // dispatch(
        //     openToast({
        //         data: {
        //             type: 'error',
        //             message: 'error'
        //         }
        //     })
        // );
        return rejectWithValue(error);
    }
});

const loginThunk = createAsyncThunk('auth/login', async (body, { dispatch, rejectWithValue }) => {
    try {
        const res = await authService.logIn(body);
        // -----------
        localService.setItem(LOCAL_STORAGE.accessToken, JSON.stringify(res.data.accessToken));
        dispatch(getMeThunk());
        return;
    } catch (error) {
        // dispatch(
        //     openToast({
        //         data: {
        //             type: 'error',
        //             message: 'error'
        //         }
        //     })
        // );
        return rejectWithValue(error);
    }
});

const googleLoginThunk = createAsyncThunk('auth/login', async (_, { dispatch, rejectWithValue }) => {
    try {
        const res = await authService.logInByGoogle();
        console.log(res);
        // -----------
        // localService.setItem(LOCAL_STORAGE.accessToken, JSON.stringify(res.data.accessToken));
        // dispatch(getMeThunk());
        return;
    } catch (error) {
        // dispatch(
        //     openToast({
        //         data: {
        //             type: 'error',
        //             message: 'error'
        //         }
        //     })
        // );
        return rejectWithValue(error);
    }
});

const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
    try {
        await authService.logout();
        // -----------
        localService.removeItem(LOCAL_STORAGE.accessToken);
        dispatch(setUser(null));
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer, actions } = authSlice;
export const { setUser, removeUser } = actions;
export { getMeThunk, loginThunk, logoutThunk, googleLoginThunk };
export default reducer;
