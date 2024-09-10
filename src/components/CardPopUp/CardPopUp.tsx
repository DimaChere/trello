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
import SvgClose from "../../icons/components/Close";
import { ImageButton } from "../ImageButton";

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
            <ImageButton
                onClickFunction={handleClosePopUp}
                additionalStyles="card-pop-up__close"
            >
                <SvgClose />
            </ImageButton>
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
