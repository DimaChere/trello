import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/store/store";
import { CardType } from "../app/store/card/types";
import { actions } from "../app/store";

export const useCardDescriptionChange = (card: CardType) => {
    const dispatch = useAppDispatch();
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
        dispatch(
            actions.card.editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { description: newDescription.trim() },
            })
        );
        setIsDescriptionChanging(false);
    };

    const handleDescriptionDelete = () => {
        dispatch(
            actions.card.editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { description: null },
            })
        );
        setIsDescriptionChanging(false);
        setNewDescription("");
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
