import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/store/store";
import { CardType } from "../app/store/card";
import { actions } from "../app/store";

export const useCardNameChange = (card: CardType) => {
    const dispatch = useAppDispatch();
    const [isNameChanging, setIsNameChanging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOpenNameEditor = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNameChanging((prev) => !prev);
    };

    const handleTitleCardSubmit = (newTitle: string) => {
        dispatch(
            actions.card.editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { title: newTitle },
            })
        );
        changeEditVisibility();
    };

    const changeEditVisibility = () => {
        setIsNameChanging((prev) => !prev);
    };

    useEffect(() => {
        if (isNameChanging && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isNameChanging]);

    return {
        isNameChanging,
        inputRef,
        handleOpenNameEditor,
        handleTitleCardSubmit,
        changeEditVisibility,
    };
};
