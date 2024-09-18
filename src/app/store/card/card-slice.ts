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

const initialState: { cards: CardType[] } = {
    cards: [],
};

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<AddCardPayload>) => {
            state.cards.push(action.payload.card);
        },
        removeCard: (state, action: PayloadAction<RemoveCardPayload>) => {
            state.cards = state.cards.filter(
                (card) => card.id !== action.payload.cardId
            );
        },
        editCard: (state, action: PayloadAction<EditCardPayload>) => {
            const card = state.cards.find(
                (card) => card.id === action.payload.cardId
            );
            if (card) {
                Object.assign(card, action.payload.updates);
            }
        },
        addComment: (state, action: PayloadAction<AddCommentPayload>) => {
            const card = state.cards.find(
                (card) => card.id === action.payload.cardId
            );
            if (card) {
                card.comments.push(action.payload.comment);
            }
        },
    },
});

export const { addCard, removeCard, editCard, addComment } = cardSlice.actions;

export default cardSlice.reducer;
