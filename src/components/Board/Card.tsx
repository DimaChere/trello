import { ACTION_TYPES, CardType } from "../../app/store/types";
import { useEffect, useRef, useState } from "react";
import { useBoard } from "../../hooks/useBoard";

export const Card: React.FC<{ card: CardType }> = ({ card }) => {
    const { dispatch } = useBoard();
    const [isNameChanging, setIsNameChanging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [newTitle, setNewTitle] = useState(card.title);

    const handleOpenNameEditor = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNameChanging((e) => !e);
    };

    useEffect(() => {
        if (isNameChanging && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isNameChanging]);

    const handleNameChange = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            dispatch({
                type: ACTION_TYPES.EDIT_CARD,
                payload: {
                    columnId: card.columnId,
                    cardId: card.id,
                    updates: { title: newTitle },
                },
            });
            setIsNameChanging(false);
        }
    };

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
            <div className="card__name">
                {isNameChanging ? (
                    <>
                        <input
                            type="text"
                            name="card-name"
                            defaultValue={card.title}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={handleNameChange}
                            ref={inputRef}
                        ></input>
                    </>
                ) : (
                    <>
                        <h3>{card.title}</h3>
                        <button className=" button">
                            <img
                                src="/Edit.svg"
                                alt="Изменить имя"
                                className="card__changeTitle"
                                onClick={handleOpenNameEditor}
                            />
                        </button>
                    </>
                )}
            </div>

            <div>
                <p className="card__comments-description">
                    <img src="/Chat.svg" alt="" />
                    {card.comments.length} <span>Комментариев</span>
                </p>
            </div>
        </div>
    );
};
