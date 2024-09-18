import { CurrentCardPopupType } from "../../app/store/types";
import { CardPopUpComments } from "../CardPopUpComments/CardPopUpComments";
import { CardPopUpDescription } from "../CardPopUpDescription/CardPopUpDescription";
import { CardPopUpHeader } from "../CardPopUpHeader/CardPopUpHeader";
import "./CardPopUp.style.sass";
import SvgClose from "../../icons/components/Close";
import { ImageButton } from "../Buttons/ImageButton";
import { useAppSelector } from "../../app/store/store";
import { selectCardById } from "../../app/store/card/selectors";
import { useEffect } from "react";

export const CardPopUp: React.FC<{
    cardInfo: CurrentCardPopupType;
    handleClosePopUp: () => void;
}> = ({ cardInfo, handleClosePopUp }) => {
    const cardPopUp = useAppSelector((state) =>
        selectCardById(state, cardInfo.id)
    );

    useEffect(() => {
        const keyDownAction = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClosePopUp();
            }
        };
        document.addEventListener("keydown", keyDownAction);
        return () => {
            document.removeEventListener("keydown", keyDownAction);
        };
    }, [handleClosePopUp]);

    if (!cardPopUp) {
        return null;
    }

    return (
        <div className="card-pop-up-background">
            <div className="card-pop-up">
                <ImageButton
                    icon={<SvgClose />}
                    additionalStyles="card-pop-up__close"
                    onClickFunction={handleClosePopUp}
                />
                {cardPopUp && (
                    <>
                        <CardPopUpHeader card={cardPopUp} />
                        <CardPopUpDescription card={cardPopUp} />
                        <CardPopUpComments card={cardPopUp} />
                    </>
                )}
            </div>
        </div>
    );
};
