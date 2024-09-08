import { useEffect, useRef, useState } from "react";
import { ACTION_TYPES, CardType, CommentType } from "../app/store/types";
import { useBoard } from "./useBoard";

export const useCardCommentControls = (
    comment: CommentType,
    card: CardType
) => {
    const { dispatch } = useBoard();
    const [isCommentChanging, setIsCommentChanging] = useState(false);
    const [newComment, setNewComment] = useState(comment.text);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const textareaResize = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleOpenCommentEditor = (e: React.MouseEvent) => {
        setIsCommentChanging((prev) => !prev);
    };

    useEffect(() => {
        if (isCommentChanging && inputRef.current) {
            inputRef.current.focus();
            textareaResize();
        }
    }, [isCommentChanging]);

    useEffect(() => {
        textareaResize();
    }, [newComment]);

    const handleCommentSubmit = () => {
        const changedComment: CommentType = {
            ...comment,
            text: newComment.trim(),
        };
        console.log(changedComment.text);
        const newComments = [...card.comments];
        newComments[newComments.indexOf(comment)] = changedComment;

        dispatch({
            type: ACTION_TYPES.EDIT_CARD,
            payload: {
                columnId: card.columnId,
                cardId: card.id,
                updates: { comments: newComments },
            },
        });
        setIsCommentChanging(false);
    };

    const handleRemoveComment = () => {
        const newComments = card.comments.filter(
            (newComment) => newComment.id !== comment.id
        );

        dispatch({
            type: ACTION_TYPES.EDIT_CARD,
            payload: {
                columnId: card.columnId,
                cardId: card.id,
                updates: { comments: newComments },
            },
        });
    };

    return {
        isCommentChanging,
        newComment,
        inputRef,
        setNewComment,
        handleOpenCommentEditor,
        handleCommentSubmit,
        handleRemoveComment,
    };
};
