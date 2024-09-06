export type State = {
    columns: ColumnType[];
    user: string | null;
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
    | { type: ACTION_TYPES.ADD_USER; payload: { userName: string } }
    | { type: ACTION_TYPES.REMOVE_USER; payload: { userName: string } }
    | {
          type: ACTION_TYPES.ADD_CARD;
          payload: { columnId: number; card: CardType };
      }
    | {
          type: ACTION_TYPES.REMOVE_CARD;
          payload: { columnId: number; cardId: string };
      }
    | {
          type: ACTION_TYPES.EDIT_CARD;
          payload: {
              columnId: number;
              cardId: string;
              updates: Partial<CardType>;
          };
      }
    | {
          type: ACTION_TYPES.MOVE_CARD;
          payload: {
              fromColumnId: number;
              toColumnId: number;
              cardId: string;
          };
      }
    | {
          type: ACTION_TYPES.ADD_COMMENT;
          payload: { cardId: string; comment: CommentType };
      };

export type ColumnType = {
    id: number;
    title: string;
    cards: CardType[];
};

export type CardType = {
    id: string;
    title: string;
    description: string | null;
    columnId: number;
    comments: CommentType[];
};

export type CommentType = {
    id: string;
    author: string;
    text: string;
};

export type BoardContextType =
    | {
          state: State;
          dispatch: React.Dispatch<Action>;
      }
    | undefined;
