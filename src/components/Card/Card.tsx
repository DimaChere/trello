import { useState } from "react";
import { CurrentCardPopupType } from "../../app/store/types";
import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgChat from "../../icons/components/Chat";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./Card.style.sass";
import { CardPopUp } from "../CardPopUp/CardPopUp";
import { CardType } from "../../app/store/card/types";

export const Card: React.FC<{ card: CardType }> = ({ card }) => {
    const [currentCardPopup, setCurrentCardPopup] =
        useState<CurrentCardPopupType | null>(null);

    const {
        isNameChanging,
        newTitle,
        inputRef,
        setNewTitle,
        handleOpenNameEditor,
        handleNameChange,
    } = useCardNameChange(card);

    const handleCardPopUpOpen = () => {
        setCurrentCardPopup({ id: card.id, columnId: card.columnId });
    };

    const handleClosePopUp = () => {
        setCurrentCardPopup(null);
    };

    const commentsDescription = `${card.comments.length} комментариев`;

    return (
        <>
            <div className="card" onClick={handleCardPopUpOpen}>
                <div className="card__header">
                    {isNameChanging ? (
                        <>
                            <input
                                type="text"
                                name="card-name"
                                className="card__input"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onKeyDown={handleNameChange}
                                ref={inputRef}
                            ></input>
                        </>
                    ) : (
                        <>
                            <h3 className="card__title">{card.title}</h3>
                            <ImageButton
                                icon={
                                    <SvgEdit className="card__change-title" />
                                }
                                onClickFunction={handleOpenNameEditor}
                            />
                        </>
                    )}
                </div>

                <div className="card__comments-description">
                    <SvgChat />
                    <p>{commentsDescription}</p>
                </div>
            </div>
            {currentCardPopup && (
                <CardPopUp
                    cardInfo={currentCardPopup}
                    handleClosePopUp={handleClosePopUp}
                />
            )}
        </>
    );
};
