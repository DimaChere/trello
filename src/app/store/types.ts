export type State = {
    columns: ColumnType[];
    user: string | null;
};

export type CurrentCardPopupType = {
    id: string;
    columnId: number;
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

export type CardContextType =
    | {
          currentCardPopup: CurrentCardPopupType | null;
          openCardPopup: (currentCardPopUp: CurrentCardPopupType) => void;
          closeCardPopup: () => void;
      }
    | undefined;
