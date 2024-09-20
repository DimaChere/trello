import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgDelete from "../../icons/components/Delete";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./CardPopUpHeader.style.sass";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { CardType } from "../../app/store/card";
import { actions, selectors } from "../../app/store";

export const CardPopUpHeader: React.FC<{ card: CardType }> = ({ card }) => {
    const user = useAppSelector(selectors.user.selectUser);

    const dispatch = useAppDispatch();

    const {
        isNameChanging,
        newTitle,
        inputRef,
        setNewTitle,
        handleOpenNameEditor,
        handleNameChange,
    } = useCardNameChange(card);

    const handlePopUpDelete = () => {
        dispatch(
            actions.card.removeCard({
                cardId: card.id,
                columnId: card.columnId,
            })
        );
    };

    const userName = user?.name;
    const column = useAppSelector((state) =>
        selectors.column.selectColumnById(state, card.columnId)
    );
    const columnTitle = column?.title;
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
