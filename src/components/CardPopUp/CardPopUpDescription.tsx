import { CardType } from "../../app/store/types";
import { useCardDescriptionChange } from "../../hooks/useCardDescriptionChange";

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
                                className="button cart-description__apply-changes-button"
                                onClick={handleDescriptionSubmit}
                            >
                                <img src="/Done.svg" alt="Сохранить" />
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
                        <img src="/Add.svg" alt="Добавить описание" />
                    </button>
                )}
                {!isDescriptionChanging && card.description && (
                    <>
                        <button
                            className="button"
                            onClick={handleOpenDescriptionEditor}
                        >
                            <img src="/Edit.svg" alt="Изменить описание" />
                        </button>
                        <button
                            className="button"
                            onClick={handleDescriptionDelete}
                        >
                            <img src="/Delete.svg" alt="Удалить описание" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
