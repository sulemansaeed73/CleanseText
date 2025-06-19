import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fileText : "", 
};

export const FileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileText: (state, action) => {
      state.fileText  = action.payload;
    },
  },
});

export const { setFileText } = FileSlice.actions;
export default FileSlice.reducer;
