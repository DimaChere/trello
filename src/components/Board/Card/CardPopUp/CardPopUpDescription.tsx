import { CardType } from "../../../../app/store/types";
import { useCardDescriptionChange } from "../../../../hooks/useCardDescriptionChange";
import SvgAdd from "../../../../icons/components/Add";
import SvgDelete from "../../../../icons/components/Delete";
import SvgDone from "../../../../icons/components/Done";
import SvgEdit from "../../../../icons/components/Edit";
import { ImageButton } from "../../../Buttons/ImageButton";

export const CardPopUpDescription: React.FC<{ card: CardType }> = ({
    card,
}) => {
    const {
        isDescriptionChanging,
        newDescription,
        inputRef,
        setNewDescription,
        handleOpenDescriptionEditor,
        handleDescriptionSubmit,
        handleDescriptionDelete,
    } = useCardDescriptionChange(card);

    const isDescriptionExistsAndNotChanging = () =>
        card.description && !isDescriptionChanging;
    const isDescriptionNotExistAndNotChanging = () =>
        !card.description && !isDescriptionChanging;

    return (
        <div className="cart-description">
            <div className="cart-description__content">
                <p className="cart-description__header">Описание</p>
                <p className="cart-description__description">
                    {isDescriptionChanging && (
                        <>
                            <textarea
                                className="cart-description__textarea cart-description__text"
                                ref={inputRef}
                                value={newDescription}
                                onChange={(e) => {
                                    setNewDescription(e.target.value);
                                }}
                            ></textarea>
                            <ImageButton
                                onClickFunction={handleDescriptionSubmit}
                                additionalStyles="button--apply-changes"
                            >
                                <SvgDone />
                            </ImageButton>
                        </>
                    )}
                    {isDescriptionExistsAndNotChanging() ? (
                        <p className="cart-description__text">
                            {card.description}
                        </p>
                    ) : (
                        <p className="cart-description__text">
                            Описание отсутствует
                        </p>
                    )}
                </p>
            </div>
            <div className="cart-description__edit">
                {isDescriptionNotExistAndNotChanging() && (
                    <ImageButton onClickFunction={handleOpenDescriptionEditor}>
                        <SvgAdd />
                    </ImageButton>
                )}
                {isDescriptionExistsAndNotChanging() && (
                    <>
                        <ImageButton
                            onClickFunction={handleOpenDescriptionEditor}
                        >
                            <SvgEdit />
                        </ImageButton>

                        <ImageButton onClickFunction={handleDescriptionDelete}>
                            <SvgDelete />
                        </ImageButton>
                    </>
                )}
            </div>
        </div>
    );
};
