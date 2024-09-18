import { useEffect, useRef, useState } from "react";
import { CardType } from "../app/store/types";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { addComment } from "../app/store/card/card-slice";
import { selectUser } from "../app/store/user/selectors";

export const useCardSendComment = (card: CardType) => {
    const user = useAppSelector(selectUser);
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
            addComment({
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
