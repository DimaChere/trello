import { CardType } from "../../app/store/types";
import { useCardDescriptionChange } from "../../hooks/useCardDescriptionChange";
import SvgAdd from "../../icons/components/Add";
import SvgDelete from "../../icons/components/Delete";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";

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
                            <button
                                className="button button--apply-changes"
                                onClick={handleDescriptionSubmit}
                            >
                                <SvgDone />
                            </button>
                        </>
                    )}
                    {!isDescriptionChanging && card.description ? (
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
                {!isDescriptionChanging && !card.description && (
                    <button
                        className="button"
                        onClick={handleOpenDescriptionEditor}
                    >
                        <SvgAdd />
                    </button>
                )}
                {!isDescriptionChanging && card.description && (
                    <>
                        <button
                            className="button"
                            onClick={handleOpenDescriptionEditor}
                        >
                            <SvgEdit />
                        </button>
                        <button
                            className="button"
                            onClick={handleDescriptionDelete}
                        >
                            <SvgDelete />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
