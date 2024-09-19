import { useState } from "react";
import { useAppDispatch } from "../app/store/store";
import { CardType, CommentType } from "../app/store/card";
import { actions } from "../app/store";

export const useCardCommentChange = (comment: CommentType, card: CardType) => {
    const dispatch = useAppDispatch();
    const [isCommentChanging, setIsCommentChanging] = useState(false);

    const handleOpenCommentEditor = (e: React.MouseEvent) => {
        setIsCommentChanging((prev) => !prev);
    };

    const handleCommentSubmit = (commentText: string) => {
        const changedComment: CommentType = {
            ...comment,
            text: commentText.trim(),
        };

        const newComments = [...card.comments];
        newComments[newComments.indexOf(comment)] = changedComment;

        dispatch(
            actions.card.editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { comments: newComments },
            })
        );
        setIsCommentChanging(false);
    };

    const handleRemoveComment = () => {
        const newComments = card.comments.filter(
            (newComment) => newComment.id !== comment.id
        );

        dispatch(
            actions.card.editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { comments: newComments },
            })
        );
        setIsCommentChanging(false);
    };

    return {
        isCommentChanging,
        handleOpenCommentEditor,
        handleCommentSubmit,
        handleRemoveComment,
    };
};
