import { useCallback, useEffect, useRef, useState } from "react";
import { CardType } from "../app/store/types";
import { useDispatch } from "react-redux";
import { editCard } from "../app/store/features/boardSlice";

export const useCardNameChange = (card: CardType) => {
    const dispatch = useDispatch();
    const [isNameChanging, setIsNameChanging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [newTitle, setNewTitle] = useState(card.title);

    const handleOpenNameEditor = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNameChanging((prev) => !prev);
    };

    useEffect(() => {
        if (isNameChanging && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isNameChanging]);

    const handleNameChange = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            dispatch(
                editCard({
                    columnId: card.columnId,
                    cardId: card.id,
                    updates: { title: newTitle },
                })
            );
            setIsNameChanging(false);
        }
    };

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                dispatch(
                    editCard({
                        columnId: card.columnId,
                        cardId: card.id,
                        updates: { title: newTitle },
                    })
                );
                setIsNameChanging(false);
            }
        },
        [card.columnId, card.id, dispatch, newTitle]
    );

    useEffect(() => {
        if (isNameChanging) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isNameChanging, handleOutsideClick]);

    return {
        isNameChanging,
        newTitle,
        inputRef,
        setNewTitle,
        handleOpenNameEditor,
        handleNameChange,
    };
};
