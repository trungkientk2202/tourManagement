import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import mediaReducer from './media/media.slice';
import tourReducer from './tour/tour.slice';
import destinationReducer from './destination/destination.slice';
import scheduleReducer from './schedule/schedule.slice';
import userReducer from './user/user.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    media: mediaReducer,
    tour: tourReducer,
    destination: destinationReducer,
    schedule: scheduleReducer,
    user: userReducer
});

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['auth/logIn/rejected', 'auth/getMe/rejected'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['auth.error']
            }
        }),
    reducer: rootReducer
});

export default store;
