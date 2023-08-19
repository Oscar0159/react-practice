import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from "./auth/authReducer"

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;