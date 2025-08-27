import { createSlice } from "@reduxjs/toolkit";

const interestSlice = createSlice({
    name: "interest",
    initialState: {
        userInterests: []
    },
    reducers: {
        setUserInterests: (state, action) => {
            state.userInterests = action.payload
        }
    }
})

export const {setUserInterests} = interestSlice.actions

export default interestSlice.reducer