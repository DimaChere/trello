import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType, CommentType, State } from "../types";

const savedState: string | null = localStorage.getItem("appState");

const initialState: State = savedState
    ? JSON.parse(savedState)
    : {
          columns: [
              { id: 1, title: "TODO", cards: [] },
              { id: 2, title: "In Progress", cards: [] },
              { id: 3, title: "Testing", cards: [] },
              { id: 4, title: "Done", cards: [] },
          ],
          user: "",
      };

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{ userName: string }>) => {
            state.user = action.payload.userName;
        },
        removeUser: (state) => {
            state.user = null;
        },
        addCard: (
            state,
            action: PayloadAction<{ columnId: number; card: CardType }>
        ) => {
            const column = state.columns.find(
                (col) => col.id === action.payload.columnId
            );
            if (column) {
                column.cards.push(action.payload.card);
            }
        },
        removeCard: (
            state,
            action: PayloadAction<{ columnId: number; cardId: string }>
        ) => {
            const column = state.columns.find(
                (col) => col.id === action.payload.columnId
            );
            if (column) {
                column.cards = column.cards.filter(
                    (card) => card.id !== action.payload.cardId
                );
            }
        },
        editCard: (
            state,
            action: PayloadAction<{
                columnId: number;
                cardId: string;
                updates: Partial<CardType>;
            }>
        ) => {
            const column = state.columns.find(
                (col) => col.id === action.payload.columnId
            );
            if (column) {
                const card = column.cards.find(
                    (card) => card.id === action.payload.cardId
                );
                if (card) {
                    Object.assign(card, action.payload.updates);
                }
            }
        },
        addComment: (
            state,
            action: PayloadAction<{ cardId: string; comment: CommentType }>
        ) => {
            for (const column of state.columns) {
                const card = column.cards.find(
                    (card) => card.id === action.payload.cardId
                );
                if (card) {
                    card.comments.push(action.payload.comment);
                    break;
                }
            }
        },
    },
});

export const {
    addUser,
    removeUser,
    addCard,
    removeCard,
    editCard,
    addComment,
} = boardSlice.actions;
export default boardSlice.reducer;
