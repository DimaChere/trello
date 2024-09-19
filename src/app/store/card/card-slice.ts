import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType, CommentType } from "./types";

type AddCardPayload = { columnId: number; card: CardType };
type RemoveCardPayload = { columnId: number; cardId: string };
type EditCardPayload = {
    columnId: number;
    cardId: string;
    updates: Partial<CardType>;
};
type AddCommentPayload = { cardId: string; comment: CommentType };

const initialState: CardType[] = [];
const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<AddCardPayload>) => {
            const { card } = action.payload;

            state.push(card);
        },
        removeCard: (state, action: PayloadAction<RemoveCardPayload>) => {
            const { cardId } = action.payload;

            state = state.filter((card) => card.id !== cardId);
        },
        editCard: (state, action: PayloadAction<EditCardPayload>) => {
            const { cardId, updates } = action.payload;

            const card = state.find((card) => card.id === cardId);
            if (card) {
                Object.assign(card, updates);
            }
        },
        addComment: (state, action: PayloadAction<AddCommentPayload>) => {
            const { cardId, comment } = action.payload;

            const card = state.find((card) => card.id === cardId);
            if (card) {
                card.comments.push(comment);
            }
        },
    },
});

export const { addCard, removeCard, editCard, addComment } = cardSlice.actions;

export default cardSlice.reducer;
