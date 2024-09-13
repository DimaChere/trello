import { useEffect, useRef, useState } from "react";
import { useBoard } from "./useBoard";
import { ACTION_TYPES, CardType } from "../app/store/types";
import { v4 as uuidv4 } from "uuid";

export const useCardSendComment = (card: CardType) => {
    const { state, dispatch } = useBoard();
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [newComment, setNewComment] = useState("");

    const handleTextareaResize = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleCommentSubmit = () => {
        dispatch({
            type: ACTION_TYPES.ADD_COMMENT,
            payload: {
                cardId: card.id,
                comment: {
                    id: uuidv4(),
                    author: state.user || "anonymous",
                    text: newComment.trim(),
                },
            },
        });

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
