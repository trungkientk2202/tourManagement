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
            .addCase(logInThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(logInThunk.fulfilled, (state, action) => {
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

        return res.data;
    } catch (error) {
        localService.removeItem(LOCAL_STORAGE.currentUser);
        // dispatch(
        //     openToast({
        //         data: {
        //             type: 'error',
        //             message: 'error'
        //         }
        //     })
        // );
        console.log(error);
        return rejectWithValue(error);
    }
});

const logInThunk = createAsyncThunk('auth/logIn', async (body, { dispatch, rejectWithValue }) => {
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
