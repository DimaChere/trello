import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CardType } from "../../app/store/card/types";
import { CurrentCardPopupType } from "../../app/store/types";
import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgChat from "../../icons/components/Chat";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";
import { CardPopUp } from "../CardPopUp/CardPopUp";
import "./Card.style.sass";
interface CardForm {
    title: string;
}

type CardProps = {
    card: CardType;
    columnId: number;
};

export const Card: React.FC<CardProps> = ({ card, columnId }) => {
    const [currentCardPopup, setCurrentCardPopup] =
        useState<CurrentCardPopupType | null>(null);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id,
        data: {
            columnId,
            type: "card",
        },
    });

    const {
        isNameChanging,
        inputRef,
        handleOpenNameEditor,
        handleTitleCardSubmit,
    } = useCardNameChange(card);

    const { control, handleSubmit } = useForm<CardForm>({
        defaultValues: { title: card.title },
    });

    const onSubmit = (data: CardForm) => {
        handleTitleCardSubmit(data.title);
    };

    const handleCardPopUpOpen = () => {
        if (!isNameChanging) {
            setCurrentCardPopup({ id: card.id, columnId: card.columnId });
        }
    };

    const handleClosePopUp = () => {
        setCurrentCardPopup(null);
    };

    const commentsDescription = `${card.comments.length} комментариев`;

    return (
        <>
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={{
                    transform: transform
                        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                        : undefined,
                }}
                className="card"
                onClick={handleCardPopUpOpen}
            >
                <div className="card__header">
                    {isNameChanging ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{ maxLength: 20 }}
                                render={({ field }) => (
                                    <input
                                        className="card__input"
                                        type="text"
                                        {...field}
                                        ref={(e) => {
                                            field.ref(e);
                                            if (e) {
                                                inputRef.current = e;
                                            }
                                        }}
                                    />
                                )}
                            />
                            <SubmitImageButton
                                icon={<SvgDone />}
                                additionalStyles="button--apply-changes"
                            />
                        </form>
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
