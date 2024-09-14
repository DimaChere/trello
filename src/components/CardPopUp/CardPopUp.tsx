import { useEffect, useState } from "react";
import {
    CardType,
    ColumnType,
    CurrentCardPopupType,
} from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { CardPopUpComments } from "../CardPopUpComments/CardPopUpComments";
import { CardPopUpDescription } from "../CardPopUpDescription/CardPopUpDescription";
import { CardPopUpHeader } from "../CardPopUpHeader/CardPopUpHeader";
import "./CardPopUp.style.sass";
import SvgClose from "../../icons/components/Close";
import { ImageButton } from "../Buttons/ImageButton";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";

export const CardPopUp: React.FC<{ cardInfo: CurrentCardPopupType }> = ({
    cardInfo,
}) => {
    const columns = useSelector((state: RootState) => state.board.columns);
    const { closeCardPopup } = useBoard();
    const [currentCard, setCurrentCard] = useState<CardType>();

    useEffect(() => {
        const column: ColumnType | undefined = columns.find(
            (element) => element.id === cardInfo.columnId
        );
        const card: CardType | undefined = column?.cards?.find(
            (card) => card.id === cardInfo.id
        );

        if (card) {
            setCurrentCard(card);
        }
    }, [columns, cardInfo]);

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
