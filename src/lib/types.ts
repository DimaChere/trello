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

export type Action =
    | { type: "ADD_USER"; userName: string }
    | { type: "REMOVE_USER"; userName: string }
    | { type: "ADD_CARD"; columnId: string; card: CardTypes }
    | { type: "REMOVE_CARD"; columnId: string; cardId: string }
    | {
          type: "EDIT_CARD";
          columnId: string;
          cardId: string;
          updates: Partial<CardTypes>;
      }
    | {
          type: "MOVE_CARD";
          fromColumnId: string;
          toColumnId: string;
          cardId: string;
      }
    | { type: "ADD_COMMENT"; cardId: string; comment: Comment };

export type ColumnType = {
    id: string;
    title: string;
    cards: CardTypes[];
};
