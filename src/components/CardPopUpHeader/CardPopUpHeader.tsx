import { useCardNameChange } from "../../hooks/useCardNameChange";
import SvgDelete from "../../icons/components/Delete";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./CardPopUpHeader.style.sass";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { CardType } from "../../app/store/card";
import { actions, selectors } from "../../app/store";
import { Controller, useForm } from "react-hook-form";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";
import SvgDone from "../../icons/components/Done";

interface HeaderForm {
    title: string;
}

export const CardPopUpHeader: React.FC<{ card: CardType }> = ({ card }) => {
    const user = useAppSelector(selectors.user.selectUser);
    const { control, handleSubmit } = useForm<HeaderForm>({
        defaultValues: { title: card.title },
    });

    const dispatch = useAppDispatch();

    const {
        isNameChanging,
        inputRef,
        handleOpenNameEditor,
        handleTitleCardSubmit,
    } = useCardNameChange(card);

    const handlePopUpDelete = () => {
        dispatch(
            actions.card.removeCard({
                cardId: card.id,
            })
        );
    };

    const onSubmit = (data: HeaderForm) => {
        handleTitleCardSubmit(data.title);
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
                <form
                    className="pop-up-header__form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="title"
                        control={control}
                        rules={{ maxLength: 20 }}
                        render={({ field }) => (
                            <input
                                className="pop-up-header__input"
                                type="text"
                                {...field}
                                ref={(e) => {
                                    field.ref(e);
                                    if (e) {
                                        inputRef.current = e;
                                    }
                                }}
                            />
                        )}
                    />
                    <SubmitImageButton
                        icon={<SvgDone />}
                        additionalStyles="button--apply-changes"
                    />
                </form>
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
