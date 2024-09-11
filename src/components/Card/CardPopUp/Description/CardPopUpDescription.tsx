import { CardType } from "../../../../app/store/types";
import { useCardDescriptionChange } from "../../../../hooks/useCardDescriptionChange";
import SvgAdd from "../../../../icons/components/Add";
import SvgDelete from "../../../../icons/components/Delete";
import SvgDone from "../../../../icons/components/Done";
import SvgEdit from "../../../../icons/components/Edit";
import { ImageButton } from "../../../Buttons/ImageButton";
import "./style.sass";

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

    const hasDescription = Boolean(card.description && !isDescriptionChanging);
    const isEmptyDescription = Boolean(
        !card.description && !isDescriptionChanging
    );

    return (
        <div className="card-description">
            <div className="card-description__content">
                <p className="card-description__header">Описание</p>
                <p className="card-description__description">
                    {isDescriptionChanging && (
                        <>
                            <textarea
                                className="card-description__textarea card-description__text"
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
                    {hasDescription ? (
                        <p className="card-description__text">
                            {card.description}
                        </p>
                    ) : (
                        <p className="card-description__text">
                            Описание отсутствует
                        </p>
                    )}
                </p>
            </div>
            <div className="card-description__edit">
                {isEmptyDescription && (
                    <ImageButton onClickFunction={handleOpenDescriptionEditor}>
                        <SvgAdd />
                    </ImageButton>
                )}
                {hasDescription && (
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
