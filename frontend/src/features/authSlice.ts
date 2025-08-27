import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        userInfo: [],
        isLoggedIn: false
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload,
            state.isLoggedIn = true
        }
    }
})

export const {setUser} = authSlice.actions

export default authSlice.reducer