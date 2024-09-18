import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardType } from "./types";

export const selectAllCards = (state: RootState): CardType[] =>
    state.cards.cards;

export const selectCardsFromColumnId = createSelector(
    [selectAllCards, (state: RootState, columnId: number) => columnId],
    (cards, columnId) => cards.filter((card) => card.columnId === columnId)
);

export const selectCardById = createSelector(
    [selectAllCards, (state: RootState, cardId: string) => cardId],
    (cards, cardId) => cards.find((card) => card.id === cardId)
);
