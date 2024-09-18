import { CardType } from "../../app/store/types";
import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgDelete from "../../icons/components/Delete";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./CardPopUpHeader.style.sass";
import { useDispatch, useSelector } from "react-redux";
import { removeCard } from "../../app/store/features/boardSlice";
import { RootState } from "../../app/store/store";

export const CardPopUpHeader: React.FC<{ card: CardType }> = ({ card }) => {
    const state = useSelector((state: RootState) => state.board);
    const user = state.user;
    const columns = state.columns;
    const dispatch = useDispatch();

    const {
        isNameChanging,
        newTitle,
        inputRef,
        setNewTitle,
        handleOpenNameEditor,
        handleNameChange,
    } = useCardNameChange(card);

    const handlePopUpDelete = () => {
        dispatch(removeCard({ cardId: card.id, columnId: card.columnId }));
    };

    const userName = user;
    const columnTitle = columns.find((c) => c.id === card.columnId)?.title;
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
