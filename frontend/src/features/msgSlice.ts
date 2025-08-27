import { createSlice } from "@reduxjs/toolkit";

const msgSlice = createSlice({
  name: "msg",
  initialState: {
    messages: {},
  },
  reducers: {
    setMessages: (state, action) => {
      const { receiverId, messages } = action.payload;
      //@ts-ignore
      state.messages[receiverId] = messages;
    },
  },
});

export const { setMessages } = msgSlice.actions;

export default msgSlice.reducer;
