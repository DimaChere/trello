export type CardTypes = {
    id: string;
    title: string;
    description: string;
    column: string;
    comments: Comment[];
};

export type Comment = {
    id: string;
    author: string;
    text: string;
};

export type State = {
    columns: {
        [key: string]: {
            id: string;
            title: string;
            cards: CardTypes[];
        };
    };
    users: string[];
};

export enum ACTION_TYPES {
    ADD_USER = "ADD_USER",
    REMOVE_USER = "REMOVE_USER",
    ADD_CARD = "ADD_CARD",
    REMOVE_CARD = "REMOVE_CARD",
    MOVE_CARD = "MOVE_CARD",
    EDIT_CARD = "EDIT_CARD",
    ADD_COMMENT = "ADD_COMMENT",
}

export type Action =
    | { type: ACTION_TYPES.ADD_USER; userName: string }
    | { type: ACTION_TYPES.REMOVE_USER; userName: string }
    | { type: ACTION_TYPES.ADD_CARD; columnId: string; card: CardTypes }
    | { type: ACTION_TYPES.REMOVE_CARD; columnId: string; cardId: string }
    | {
          type: ACTION_TYPES.EDIT_CARD;
          columnId: string;
          cardId: string;
          updates: Partial<CardTypes>;
      }
    | {
          type: ACTION_TYPES.MOVE_CARD;
          fromColumnId: string;
          toColumnId: string;
          cardId: string;
      }
    | { type: ACTION_TYPES.ADD_COMMENT; cardId: string; comment: Comment };

export type ColumnType = {
    id: string;
    title: string;
    cards: CardTypes[];
};

export type BoardContextType =
    | {
          state: State;
          dispatch: React.Dispatch<Action>;
      }
    | undefined;
