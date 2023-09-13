import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';

const rootReducer = combineReducers({
    auth: authSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;