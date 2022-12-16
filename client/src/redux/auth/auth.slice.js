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
            .addCase(logInThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(logInThunk.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            .addCase(logInThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(logInGoogleThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logInGoogleThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(logInGoogleThunk.rejected, (state, action) => {
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
            })
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(forgotPasswordThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPasswordThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(forgotPasswordThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(resetPasswordThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPasswordThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPasswordThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

const getMeThunk = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
    try {
        const res = await authService.loadUser();
        localService.setItem(LOCAL_STORAGE.currentUser, JSON.stringify(res.data?.data));
        return res.data?.data;
    } catch (error) {
        localService.removeItem(LOCAL_STORAGE.currentUser);
        return rejectWithValue(error);
    }
});

const registerThunk = createAsyncThunk('auth/register', async ({ body }, { rejectWithValue }) => {
    try {
        await authService.register(body);
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const logInGoogleThunk = createAsyncThunk('auth/logInGoogle', async (body, { dispatch, rejectWithValue }) => {
    try {
        const res = await authService.logInGoogle(body);
        console.log(res);
        // -----------
        dispatch(getMeThunk());
        return;
    } catch (error) {
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

const forgotPasswordThunk = createAsyncThunk('auth/forgotPassword', async (body, { rejectWithValue }) => {
    try {
        await authService.forgotPassword(body);
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const resetPasswordThunk = createAsyncThunk('auth/resetPassword', async (body, { rejectWithValue }) => {
    try {
        await authService.resetPassword(body);
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const resendThunk = createAsyncThunk('auth/resend', async (body, { rejectWithValue }) => {
    try {
        await authService.resend(body);
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer, actions } = authSlice;
export const { setUser, removeUser } = actions;
export { getMeThunk, logInThunk, logInGoogleThunk, logoutThunk, registerThunk, forgotPasswordThunk, resendThunk,resetPasswordThunk };
export default reducer;
