import { ACTION_TYPES, CardType } from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { useCardNameChange } from "../../hooks/useCardNameChange";

export const CardPopUpHeader: React.FC<{ card: CardType }> = ({ card }) => {
    const { dispatch } = useBoard();
    const {
        isNameChanging,
        newTitle,
        inputRef,
        setNewTitle,
        handleOpenNameEditor,
        handleNameChange,
    } = useCardNameChange(card);

    const handlePopUpDelete = () => {
        dispatch({
            type: ACTION_TYPES.REMOVE_CARD,
            payload: { cardId: card.id, columnId: card.columnId },
        });
        dispatch({ type: ACTION_TYPES.CLOSE_CARD_POPUP });
    };

    return (
        <div className="card-pop-up__header">
            {isNameChanging ? (
                <>
                    <input
                        type="text"
                        name="card-name"
                        className="card-pop-up__title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={handleNameChange}
                        ref={inputRef}
                    ></input>
                </>
            ) : (
                <>
                    <p className="card-pop-up__title">{card.title}</p>
                </>
            )}

            <div className="card-pop-up__edit-card">
                <button className="button" onClick={handleOpenNameEditor}>
                    <img src="/Edit.svg" alt="Изменить название" />
                </button>
                <button className="button" onClick={handlePopUpDelete}>
                    <img src="/Delete.svg" alt="Удалить карточку" />
                </button>
            </div>
        </div>
    );
};
