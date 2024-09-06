import { Action, ACTION_TYPES, State } from "./types";

export const reducer = (state: State, action: Action): State => {
    let updatedColumns;

    switch (action.type) {
        case ACTION_TYPES.ADD_USER:
            return {
                ...state,
                user: action.payload.userName,
            };
        case ACTION_TYPES.REMOVE_USER:
            return {
                ...state,
                user: "",
            };

        case ACTION_TYPES.ADD_CARD:
            const { columnId, card } = action.payload;

            updatedColumns = state.columns.map((column) => {
                if (column.id === columnId) {
                    return {
                        ...column,
                        cards: [...column.cards, card],
                    };
                } else {
                    return column;
                }
            });

            return {
                ...state,
                columns: updatedColumns,
            };

        case ACTION_TYPES.REMOVE_CARD:
            const { columnId: removeColumnId, cardId: removeCardId } =
                action.payload;

            const updatedColumnsAfterRemove = state.columns.map((column) => {
                if (column.id === removeColumnId) {
                    return {
                        ...column,
                        cards: column.cards.filter(
                            (card) => card.id !== removeCardId
                        ),
                    };
                } else {
                    return column;
                }
            });

            return {
                ...state,
                columns: updatedColumnsAfterRemove,
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
        case ACTION_TYPES.ADD_COMMENT:
            updatedColumns = [...state.columns];
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
