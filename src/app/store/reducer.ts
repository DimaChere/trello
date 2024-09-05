import { Action, ACTION_TYPES, State } from "./types";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.userName],
            };
        case ACTION_TYPES.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user !== action.userName),
            };
        case ACTION_TYPES.ADD_CARD:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.columnId]: {
                        ...state.columns[action.columnId],
                        cards: [
                            ...state.columns[action.columnId].cards,
                            action.card,
                        ],
                    },
                },
            };
        case ACTION_TYPES.REMOVE_CARD:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.columnId]: {
                        ...state.columns[action.columnId],
                        cards: state.columns[action.columnId].cards.filter(
                            (card) => card.id !== action.cardId
                        ),
                    },
                },
            };
        case ACTION_TYPES.EDIT_CARD:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.columnId]: {
                        ...state.columns[action.columnId],
                        cards: state.columns[action.columnId].cards.map(
                            (card) =>
                                card.id === action.cardId
                                    ? { ...card, ...action.updates }
                                    : card
                        ),
                    },
                },
            };
        case ACTION_TYPES.MOVE_CARD:
            const cardToMove = state.columns[action.fromColumnId].cards.find(
                (card) => card.id === action.cardId
            );
            if (!cardToMove) return state;

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.fromColumnId]: {
                        ...state.columns[action.fromColumnId],
                        cards: state.columns[action.fromColumnId].cards.filter(
                            (card) => card.id !== action.cardId
                        ),
                    },
                    [action.toColumnId]: {
                        ...state.columns[action.toColumnId],
                        cards: [
                            ...state.columns[action.toColumnId].cards,
                            cardToMove,
                        ],
                    },
                },
            };
        case ACTION_TYPES.ADD_COMMENT:
            const updatedColumns = Object.keys(state.columns).reduce(
                (acc, columnId) => {
                    const updatedCards = state.columns[columnId].cards.map(
                        (card) =>
                            card.id === action.cardId
                                ? {
                                      ...card,
                                      comments: [
                                          ...card.comments,
                                          action.comment,
                                      ],
                                  }
                                : card
                    );
                    return {
                        ...acc,
                        [columnId]: {
                            ...state.columns[columnId],
                            cards: updatedCards,
                        },
                    };
                },
                {}
            );

            return {
                ...state,
                columns: updatedColumns,
            };
        default:
            return state;
    }
};
