import { useEffect, useRef, useState } from "react";
import { editCard } from "../app/store/card/card-slice";
import { useAppDispatch } from "../app/store/store";
import { CardType, CommentType } from "../app/store/card/types";

export const useCardCommentChange = (comment: CommentType, card: CardType) => {
    const dispatch = useAppDispatch();
    const [isCommentChanging, setIsCommentChanging] = useState(false);
    const [newComment, setNewComment] = useState(comment.text);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const textareaResize = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.minHeight = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleOpenCommentEditor = (e: React.MouseEvent) => {
        setIsCommentChanging((prev) => !prev);
        setNewComment((c) => c.trim());
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

        const newComments = [...card.comments];
        newComments[newComments.indexOf(comment)] = changedComment;

        dispatch(
            editCard({
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
            editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { comments: newComments },
            })
        );
        setIsCommentChanging(false);
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
