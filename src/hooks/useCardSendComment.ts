import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { CardType } from "../app/store/card";
import { actions, selectors } from "../app/store";

export const useCardSendComment = (card: CardType) => {
    const user = useAppSelector(selectors.user.selectUser);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [newComment, setNewComment] = useState("");

    const handleTextareaResize = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleCommentSubmit = () => {
        dispatch(
            actions.comment.addComment({
                cardId: card.id,
                comment: {
                    id: uuidv4(),
                    author: user?.name || "anonymous",
                    text: newComment.trim(),
                },
            })
        );

        setNewComment("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        handleTextareaResize();
    }, [newComment]);

    return { inputRef, setNewComment, handleCommentSubmit };
};
