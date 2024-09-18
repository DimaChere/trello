import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "./types";

const initialState: { comments: CommentType[] } = {
    comments: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
