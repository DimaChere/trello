import * as card from "./card";
import * as column from "./column";
import * as comment from "./comment";
import * as user from "./user";

export const selectors = {
    card: {
        selectAllCards: card.selectAllCards,
        selectCardById: card.selectCardById,
        selectCardsFromColumnId: card.selectCardsFromColumnId,
    },
    column: {},
    comment: {},
    user: {
        addUser: user.addUser,
        removeUser: user.removeUser,
    },
};

export const actions = {
    card: {
        addCard: card.addCard,
        removeCard: card.removeCard,
        editCard: card.editCard,
    },
    column: {
        selectAllColumns: column.selectAllColumns,
        selectColumnById: column.selectColumnById,
    },
    comment: {
        selectAllComments: comment.selectAllComments,
    },
    user: {
        selectUser: user.selectUser,
    },
};
