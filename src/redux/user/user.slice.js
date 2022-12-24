import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/user.service';

const initialValues = {
    userList: [],
    roleList: [],
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
            })
            .addCase(searchThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(searchThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(searchThunk.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getRolesThunk.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(getRolesThunk.fulfilled, (state, action) => {
                state.roleList = action.payload;
                state.loading = false;
            })
            .addCase(getRolesThunk.rejected, (state, action) => {
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
export const getRolesThunk = createAsyncThunk('user/role', async (_, { rejectWithValue }) => {
    try {
        const res = await userService.getRoleList();
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

export const searchThunk = createAsyncThunk('user/search', async (phoneNumber, { rejectWithValue }) => {
    try {
        const res = await userService.getUserByPhone(phoneNumber);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteUserThunk = createAsyncThunk('user/delete', async ({ id, action }, { rejectWithValue }) => {
    try {
        await userService.deleteUser(id);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addUserManagerThunk = createAsyncThunk('user/add', async ({ body, action }, { rejectWithValue }) => {
    try {
        await userService.addUserManager(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editUserManagerThunk = createAsyncThunk('user/edit', async ({ body, action }, { rejectWithValue }) => {
    try {
        await userService.editUserManager(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteUserManagerThunk = createAsyncThunk('user/delete', async ({ id, action }, { rejectWithValue }) => {
    try {
        await userService.deleteUserManager(id);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addUserThunk = createAsyncThunk('user/add', async ({ body, action }, { rejectWithValue }) => {
    try {
        await userService.addUser(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editUserThunk = createAsyncThunk('user/edit', async ({ body, action }, { rejectWithValue }) => {
    try {
        await userService.editUser(body);
        action();
        return;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const { reducer } = userSlice;
export default reducer;
