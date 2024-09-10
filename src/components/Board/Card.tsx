import { ACTION_TYPES, CardType } from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgChat from "../../icons/components/Chat";
import SvgEdit from "../../icons/components/Edit";

export const Card: React.FC<{ card: CardType }> = ({ card }) => {
    const { dispatch } = useBoard();
    const {
        isNameChanging,
        newTitle,
        inputRef,
        setNewTitle,
        handleOpenNameEditor,
        handleNameChange,
    } = useCardNameChange(card);

    const handleCardPopUpOpen = () => {
        dispatch({
            type: ACTION_TYPES.OPEN_CARD_POPUP,
            payload: {
                card: card,
            },
        });
    };

    return (
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
                        <button
                            className="button"
                            onClick={handleOpenNameEditor}
                        >
                            <SvgEdit className="card__change-title" />
                        </button>
                    </>
                )}
            </div>

            <div>
                <p className="card__comments-description">
                    <SvgChat />
                    {card.comments.length} <span>Комментариев</span>
                </p>
            </div>
        </div>
    );
};
