import { useDroppable } from "@dnd-kit/core";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { actions, selectors } from "../../app/store";
import { CardType } from "../../app/store/card/types";
import { ColumnType } from "../../app/store/column/types";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useColumnTitleChange } from "../../hooks/useColumnTitleChange";
import SvgAdd from "../../icons/components/Add";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";
import { Card } from "../Card/Card";
import "./Column.style.sass";

interface ColumnForm {
    title: string;
}

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit } = useForm<ColumnForm>({
        defaultValues: { title: column.title },
    });

    const { setNodeRef: setDropNodeRef } = useDroppable({
        id: column.id,
        data: {
            columnId: column.id,
            accepts: ["card"],
        },
    });

    const {
        isNameChanging,
        inputRef,
        handleOpenNameEditor,
        handleTitleCardSubmit,
    } = useColumnTitleChange(column);

    const handleAddCard = () => {
        const newCard: CardType = {
            id: uuidv4(),
            title: "New Card",
            description: null,
            columnId: column.id,
            comments: [],
        };

        dispatch(actions.card.addCard({ columnId: column.id, card: newCard }));
    };

    const onSubmit = (data: ColumnForm) => {
        handleTitleCardSubmit(data.title);
    };

    const cards = useAppSelector((state) =>
        selectors.card.selectCardsFromColumnId(state, column.id)
    );

    return (
        <div ref={setDropNodeRef}>
            <hgroup className="column-header">
                {isNameChanging ? (
                    <form
                        className="column-header__form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="title"
                            control={control}
                            rules={{ maxLength: 20 }}
                            render={({ field }) => (
                                <input
                                    className="column-header__input"
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
                    <>
                        <h2 className="column-header__title">{column.title}</h2>
                        <ImageButton
                            icon={<SvgEdit />}
                            onClickFunction={handleOpenNameEditor}
                        />
                    </>
                )}
            </hgroup>

            <div className="column">
                <div className="column__controls">
                    <ImageButton
                        icon={<SvgAdd />}
                        additionalStyles="column__add-card"
                        onClickFunction={handleAddCard}
                    />
                </div>
                <div className="column__cards">
                    {cards.map((card) => (
                        <Card key={card.id} card={card} columnId={column.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
