import { Action, ACTION_TYPES, State } from "./types";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload.userName],
            };
        case ACTION_TYPES.REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user !== action.payload.userName
                ),
            };

        case ACTION_TYPES.ADD_CARD:
            const columns = [...state.columns];
            let changingColumn = 0;

            for (let i = 0; i < state.columns.length; i++) {
                if (state.columns[i].id === action.payload.columnId) {
                    changingColumn = i;
                }
            }

            const newCards = columns[changingColumn].cards.concat(
                action.payload.card
            );

            state.columns[changingColumn].cards = newCards;

            columns[changingColumn] = {
                ...columns[changingColumn],
                cards: newCards,
            };
            return {
                ...state,
                columns: columns,
            };
        case ACTION_TYPES.REMOVE_CARD:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.columnId]: {
                        ...state.columns[action.payload.columnId],
                        cards: state.columns[
                            action.payload.columnId
                        ].cards.filter(
                            (card) => card.id !== action.payload.cardId
                        ),
                    },
                },
            };
        case ACTION_TYPES.EDIT_CARD:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.columnId]: {
                        ...state.columns[action.payload.columnId],
                        cards: state.columns[action.payload.columnId].cards.map(
                            (card) =>
                                card.id === action.payload.cardId
                                    ? { ...card, ...action.payload.updates }
                                    : card
                        ),
                    },
                },
            };
        case ACTION_TYPES.MOVE_CARD:
            const cardToMove = state.columns[
                action.payload.fromColumnId
            ].cards.find((card) => card.id === action.payload.cardId);
            if (!cardToMove) return state;

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.fromColumnId]: {
                        ...state.columns[action.payload.fromColumnId],
                        cards: state.columns[
                            action.payload.fromColumnId
                        ].cards.filter(
                            (card) => card.id !== action.payload.cardId
                        ),
                    },
                    [action.payload.toColumnId]: {
                        ...state.columns[action.payload.toColumnId],
                        cards: [
                            ...state.columns[action.payload.toColumnId].cards,
                            cardToMove,
                        ],
                    },
                },
            };
        case ACTION_TYPES.ADD_COMMENT:
            const updatedColumns = [...state.columns];
            for (let i = 0; i < updatedColumns.length; i++) {
                if (
                    updatedColumns[i].cards.some(
                        (card) => card.id === action.payload.cardId
                    )
                ) {
                    updatedColumns[i].cards.forEach((card) => {
                        if (card.id === action.payload.cardId) {
                            card.comments.push(action.payload.comment);
                        }
                    });
                }
            }

            return {
                ...state,
                columns: updatedColumns,
            };
        default:
            return state;
    }
};
