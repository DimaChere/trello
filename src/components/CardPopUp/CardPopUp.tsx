import { useEffect, useState } from "react";
import {
    ACTION_TYPES,
    CardType,
    CurrentPopupCardType,
} from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { CardPopUpComments } from "./CardPopUpComments";
import { CardPopUpDescription } from "./CardPopUpDescription";
import { CardPopUpHeader } from "./CardPopUpHeader";
import "./style.sass";

export const CardPopUp: React.FC<{ cardInfo: CurrentPopupCardType }> = ({
    cardInfo,
}) => {
    const { state, dispatch } = useBoard();
    const [curCard, setCurCard] = useState<CardType>();

    useEffect(() => {
        const card: CardType | undefined = state.columns
            .find((element) => element.id === cardInfo.columnId)
            ?.cards?.find((card) => card.id === cardInfo.id);
        if (card) {
            setCurCard(card);
        }
    }, [state.columns, cardInfo]);

    const handleClosePopUp = () => {
        dispatch({ type: ACTION_TYPES.CLOSE_CARD_POPUP });
    };

    return (
        <div className="card-pop-up">
            <button
                className="card-pop-up__close button"
                onClick={handleClosePopUp}
            >
                <img src="/Close.svg" alt="Close" />
            </button>
            {curCard && (
                <>
                    <CardPopUpHeader card={curCard} />
                    <CardPopUpDescription card={curCard} />
                    <CardPopUpComments card={curCard} />
                </>
            )}
        </div>
    );
};
