import { createSlice } from "@reduxjs/toolkit";
import { CommentType } from "./types";

const initialState: CommentType[] = [];
const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
});

export default commentSlice.reducer;
