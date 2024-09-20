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
