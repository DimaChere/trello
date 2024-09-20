import { useState } from "react";
import { useAppDispatch } from "../app/store/store";
import { CardType } from "../app/store/card/types";
import { actions } from "../app/store";

export const useCardDescriptionChange = (card: CardType) => {
    const dispatch = useAppDispatch();
    const [isDescriptionChanging, setIsDescriptionChanging] = useState(false);

    const handleOpenDescriptionEditor = () => {
        setIsDescriptionChanging((prev) => !prev);
    };

    const handleDescriptionSubmit = (description: string) => {
        dispatch(
            actions.card.editCard({
                columnId: card.columnId,
                cardId: card.id,
                updates: { description: description.trim() },
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
    };

    return {
        isDescriptionChanging,
        handleOpenDescriptionEditor,
        handleDescriptionSubmit,
        handleDescriptionDelete,
    };
};
