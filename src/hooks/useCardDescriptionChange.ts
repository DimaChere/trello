import { useEffect, useRef, useState } from "react";
import { useBoard } from "./useBoard";
import { ACTION_TYPES, CardType } from "../app/store/types";

export const useCardDescriptionChange = (card: CardType) => {
    const { dispatch } = useBoard();
    const [isDescriptionChanging, setIsDescriptionChanging] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [newDescription, setNewDescription] = useState(
        card.description || ""
    );

    const textareaResize = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleOpenDescriptionEditor = () => {
        setIsDescriptionChanging((prev) => !prev);
        setNewDescription((d) => d.trim());
    };

    useEffect(() => {
        if (isDescriptionChanging && inputRef.current) {
            inputRef.current.focus();
            textareaResize();
        }
    }, [isDescriptionChanging]);

    useEffect(() => {
        textareaResize();
    }, [newDescription]);

    const handleDescriptionSubmit = () => {
        dispatch({
            type: ACTION_TYPES.EDIT_CARD,
            payload: {
                columnId: card.columnId,
                cardId: card.id,
                updates: { description: newDescription.trim() },
            },
        });
        setIsDescriptionChanging(false);
    };

    const handleDescriptionDelete = () => {
        dispatch({
            type: ACTION_TYPES.EDIT_CARD,
            payload: {
                columnId: card.columnId,
                cardId: card.id,
                updates: { description: null },
            },
        });
        setIsDescriptionChanging(false);
    };

    return {
        isDescriptionChanging,
        newDescription,
        inputRef,
        setNewDescription,
        handleOpenDescriptionEditor,
        handleDescriptionSubmit,
        handleDescriptionDelete,
    };
};
