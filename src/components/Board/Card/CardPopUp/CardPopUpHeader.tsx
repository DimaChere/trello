import { ACTION_TYPES, CardType } from "../../../../app/store/types";
import { useBoard } from "../../../../hooks/useBoard";
import { useCardNameChange } from "../../../../hooks/useCardNameChange";
import SvgDelete from "../../../../icons/components/Delete";
import SvgEdit from "../../../../icons/components/Edit";
import { ImageButton } from "../../../Buttons/ImageButton";

export const CardPopUpHeader: React.FC<{ card: CardType }> = ({ card }) => {
    const { state, dispatch } = useBoard();
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

    const Breadcrumbs = () => {
        const userName = state.user;
        const columnTitle = state.columns.find(
            (c) => c.id === card.columnId
        )?.title;
        const cardTitle = card.title;
        return (
            <>
                {userName} / {columnTitle} / {cardTitle}
            </>
        );
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
                <div>
                    <p className="card-pop-up__title">{card.title}</p>
                    <div className="card-pop-up__breadcrumbs">
                        <Breadcrumbs />
                    </div>
                </div>
            )}

            <div className="card-pop-up__edit-card">
                <ImageButton onClickFunction={handleOpenNameEditor}>
                    <SvgEdit />
                </ImageButton>
                <ImageButton onClickFunction={handlePopUpDelete}>
                    <SvgDelete />
                </ImageButton>
            </div>
        </div>
    );
};
