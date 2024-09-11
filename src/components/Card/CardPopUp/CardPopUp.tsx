import { useEffect, useState } from "react";
import { CardType, CurrentCardPopupType } from "../../../app/store/types";
import { useBoard } from "../../../hooks/useBoard";
import { CardPopUpComments } from "./CardPopUpComments";
import { CardPopUpDescription } from "./CardPopUpDescription";
import { CardPopUpHeader } from "./CardPopUpHeader";
import "./style.sass";
import SvgClose from "../../../icons/components/Close";
import { ImageButton } from "../../Buttons/ImageButton";

export const CardPopUp: React.FC<{ cardInfo: CurrentCardPopupType }> = ({
    cardInfo,
}) => {
    const { state, closeCardPopup } = useBoard();
    const [currentCard, setCurrentCard] = useState<CardType>();

    useEffect(() => {
        const card: CardType | undefined = state.columns
            .find((element) => element.id === cardInfo.columnId)
            ?.cards?.find((card) => card.id === cardInfo.id);
        if (card) {
            setCurrentCard(card);
        }
    }, [state.columns, cardInfo]);

    const handleClosePopUp = () => {
        closeCardPopup();
    };

    return (
        <div className="card-pop-up-background">
            <div className="card-pop-up">
                <ImageButton
                    onClickFunction={handleClosePopUp}
                    additionalStyles="card-pop-up__close"
                >
                    <SvgClose />
                </ImageButton>
                {currentCard && (
                    <>
                        <CardPopUpHeader card={currentCard} />
                        <CardPopUpDescription card={currentCard} />
                        <CardPopUpComments card={currentCard} />
                    </>
                )}
            </div>
        </div>
    );
};
