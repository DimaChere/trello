import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnType } from "./types";
import { CardType } from "../card";

type EditColumnPayload = {
    id: number;
    title: string;
    cards: CardType[];
    updates: Partial<ColumnType>;
};

const initialState: ColumnType[] = [
    { id: 1, title: "TODO", cards: [] },
    { id: 2, title: "In Progress", cards: [] },
    { id: 3, title: "Testing", cards: [] },
    { id: 4, title: "Done", cards: [] },
];

const columnSlice = createSlice({
    name: "column",
    initialState,
    reducers: {
        editColumn: (state, action: PayloadAction<EditColumnPayload>) => {
            const { id, updates } = action.payload;

            const column = state.find((column) => column.id === id);
            if (column) {
                Object.assign(column, updates);
            }
        },
    },
});

export const { editColumn } = columnSlice.actions;
export default columnSlice.reducer;
