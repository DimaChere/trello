import { ACTION_TYPES, CardType } from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgDelete from "../../icons/components/Delete";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./style.sass";

export const CardPopUpHeader: React.FC<{ card: CardType }> = ({ card }) => {
    const { state, dispatch, closeCardPopup } = useBoard();
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
        closeCardPopup();
    };

    const userName = state.user;
    const columnTitle = state.columns.find(
        (c) => c.id === card.columnId
    )?.title;
    const cardTitle = card.title;

    const breadcrumbs = `${userName} / ${columnTitle} / ${cardTitle}`;

    return (
        <div className="pop-up-header">
            {isNameChanging ? (
                <>
                    <input
                        type="text"
                        name="card-name"
                        className="pop-up-header__title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={handleNameChange}
                        ref={inputRef}
                    />
                </>
            ) : (
                <div>
                    <p className="pop-up-header__title">{card.title}</p>
                    <div className="pop-up-header__breadcrumbs">
                        {breadcrumbs}
                    </div>
                </div>
            )}

            <div className="pop-up-header__edit-card">
                <ImageButton
                    icon={<SvgEdit />}
                    onClickFunction={handleOpenNameEditor}
                />
                <ImageButton
                    icon={<SvgDelete />}
                    onClickFunction={handlePopUpDelete}
                />
            </div>
        </div>
    );
};
