import { CardType } from "../../app/store/card/types";
import { useCardDescriptionChange } from "../../hooks/useCardDescriptionChange";
import SvgAdd from "../../icons/components/Add";
import SvgDelete from "../../icons/components/Delete";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import { useForm } from "react-hook-form";
import "./CardPopUpDescription.style.sass";

export const CardPopUpDescription: React.FC<{ card: CardType }> = ({
    card,
}) => {
    const {
        isDescriptionChanging,
        handleOpenDescriptionEditor,
        handleDescriptionSubmit,
        handleDescriptionDelete,
    } = useCardDescriptionChange(card);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            description: card.description || "",
        },
    });

    const onSubmit = (data: { description: string }) => {
        handleDescriptionSubmit(data.description);
        reset({ description: data.description.trim() });
    };

    const hasDescription = Boolean(card.description && !isDescriptionChanging);
    const isEmptyDescription = Boolean(
        !card.description && !isDescriptionChanging
    );

    return (
        <div className="card-description">
            <div className="card-description__content">
                <p className="card-description__header">Описание</p>
                <div className="card-description__description">
                    {isDescriptionChanging ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea
                                className="card-description__textarea card-description__text"
                                {...register("description")}
                            ></textarea>
                            <ImageButton
                                icon={<SvgDone />}
                                additionalStyles="button--apply-changes"
                                onClickFunction={handleSubmit(onSubmit)}
                            />
                        </form>
                    ) : hasDescription ? (
                        <p className="card-description__text">
                            {card.description}
                        </p>
                    ) : (
                        <p className="card-description__text">
                            Описание отсутствует
                        </p>
                    )}
                </div>
            </div>
            <div className="card-description__edit">
                {isEmptyDescription && (
                    <ImageButton
                        icon={<SvgAdd />}
                        onClickFunction={handleOpenDescriptionEditor}
                    />
                )}
                {hasDescription && (
                    <>
                        <ImageButton
                            icon={<SvgEdit />}
                            onClickFunction={handleOpenDescriptionEditor}
                        />
                        <ImageButton
                            icon={<SvgDelete />}
                            onClickFunction={handleDescriptionDelete}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
