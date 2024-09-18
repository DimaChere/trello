import { RootState } from "../store";
import { CardType } from "./types";

export const selectAllCards = (state: RootState): CardType[] =>
    state.card.cards;

export const selectCardById = (
    state: RootState,
    cardId: string
): CardType | undefined => state.card.cards.find((card) => card.id === cardId);
