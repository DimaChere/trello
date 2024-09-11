import { useEffect, useState } from "react";
import {
    CardType,
    ColumnType,
    CurrentCardPopupType,
} from "../../../app/store/types";
import { useBoard } from "../../../hooks/useBoard";
import { CardPopUpComments } from "./Comments/CardPopUpComments";
import { CardPopUpDescription } from "./Description/CardPopUpDescription";
import { CardPopUpHeader } from "./Header/CardPopUpHeader";
import "./style.sass";
import SvgClose from "../../../icons/components/Close";
import { ImageButton } from "../../Buttons/ImageButton";

export const CardPopUp: React.FC<{ cardInfo: CurrentCardPopupType }> = ({
    cardInfo,
}) => {
    const { state, closeCardPopup } = useBoard();
    const [currentCard, setCurrentCard] = useState<CardType>();

    useEffect(() => {
        const column: ColumnType | undefined = state.columns.find(
            (element) => element.id === cardInfo.columnId
        );
        const card: CardType | undefined = column?.cards?.find(
            (card) => card.id === cardInfo.id
        );

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
                    icon={<SvgClose />}
                    additionalStyles="card-pop-up__close"
                    onClickFunction={handleClosePopUp}
                />
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
