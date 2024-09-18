import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "./types";

const initialState: { columns: ColumnType[] } = {
    columns: [
        { id: 1, title: "TODO", cards: [] },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Testing", cards: [] },
        { id: 4, title: "Done", cards: [] },
    ],
};

const columnSlice = createSlice({
    name: "column",
    initialState,
    reducers: {},
});

export default columnSlice.reducer;
