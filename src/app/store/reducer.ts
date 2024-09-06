import { Action, ACTION_TYPES, CardType, ColumnType, State } from "./types";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER:
            return {
                ...state,
                user: action.payload.userName,
            };
        case ACTION_TYPES.REMOVE_USER:
            return {
                ...state,
                user: null,
            };

        case ACTION_TYPES.ADD_CARD:
            const updatedColumnsAfterAddCard = state.columns.map((column) =>
                column.id === action.payload.columnId
                    ? {
                          ...column,
                          cards: [...column.cards, action.payload.card],
                      }
                    : column
            );

            return {
                ...state,
                columns: updatedColumnsAfterAddCard,
            };

        case ACTION_TYPES.REMOVE_CARD:
            const updatedColumnsAfterRemoveCard = state.columns.map((column) =>
                column.id === action.payload.columnId
                    ? {
                          ...column,
                          cards: column.cards.filter(
                              (card) => card.id !== action.payload.cardId
                          ),
                      }
                    : column
            );

            return {
                ...state,
                columns: updatedColumnsAfterRemoveCard,
            };
        case ACTION_TYPES.EDIT_CARD:
            const updatedCards = (cards: CardType[]) =>
                cards.map((card) =>
                    card.id === action.payload.cardId
                        ? { ...card, ...action.payload.updates }
                        : card
                );

            const updatedColumnsAfterEditCard = state.columns.map(
                (column: ColumnType) =>
                    column.id === action.payload.columnId
                        ? { ...column, cards: updatedCards(column.cards) }
                        : column
            );

            return {
                ...state,
                columns: updatedColumnsAfterEditCard,
            };

        case ACTION_TYPES.ADD_COMMENT:
            const updatedCardsWithComments = (cards: CardType[]) =>
                cards.map((card) =>
                    card.id === action.payload.cardId
                        ? {
                              ...card,
                              comments: [
                                  ...card.comments,
                                  action.payload.comment,
                              ],
                          }
                        : card
                );
            const updatedColumnsAfterAddingComment = state.columns.map(
                (column: ColumnType) =>
                    column.cards.some(
                        (card) => card.id === action.payload.cardId
                    )
                        ? {
                              ...column,
                              cards: updatedCardsWithComments(column.cards),
                          }
                        : column
            );

            return {
                ...state,
                columns: updatedColumnsAfterAddingComment,
            };

        default:
            return state;
    }
};
