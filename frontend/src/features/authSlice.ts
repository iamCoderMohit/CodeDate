import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        userInfo: [],
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload,
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        }
    }
})

export const {setUser, logout} = authSlice.actions

export default authSlice.reducer