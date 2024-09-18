import { RootState } from "../store";
import { CardType } from "./types";

export const selectAllCards = (state: RootState): CardType[] =>
    state.cards.cards;

export const selectCardsFromColumnId = (
    state: RootState,
    columnId: number
): CardType[] => state.cards.cards.filter((card) => card.columnId === columnId);

export const selectCardById = (
    state: RootState,
    cardId: string
): CardType | undefined => state.cards.cards.find((card) => card.id === cardId);
