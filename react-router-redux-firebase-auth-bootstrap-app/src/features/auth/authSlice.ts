import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface AuthState {
    user: User | null
    loading: boolean
}

const initialState = {
    user: null,
    loading: false,
} as AuthState

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.loading = false
            state.user = action.payload
        },
        loginFailure(state) {
            state.loading = false
        },
        logoutRequest(state) {
            state.loading = true
        },
        logoutSuccess(state) {
            state.loading = false
            state.user = null
        },
        logoutFailure(state) {
            state.loading = false
        },
        signupRequest(state) {
            state.loading = true
        },
        signupSuccess(state, action: PayloadAction<User>) {
            state.loading = false
            state.user = action.payload
        },
        signupFailure(state) {
            state.loading = false
        },
    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    signupRequest,
    signupSuccess,
    signupFailure,
} = authSlice.actions

export default authSlice.reducer