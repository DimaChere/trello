import { useEffect, useRef, useState } from "react";
import { CardType } from "../app/store/types";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../app/store/features/boardSlice";
import { RootState } from "../app/store/store";

export const useCardSendComment = (card: CardType) => {
    const user = useSelector((state: RootState) => state.board.user);
    const dispatch = useDispatch();
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
            addComment({
                cardId: card.id,
                comment: {
                    id: uuidv4(),
                    author: user || "anonymous",
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
