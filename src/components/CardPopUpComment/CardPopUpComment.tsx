import { Controller, useForm } from "react-hook-form";
import { CardType, CommentType } from "../../app/store/card/types";
import { useCardCommentChange } from "../../hooks/useCardCommentChange";
import SvgDelete from "../../icons/components/Delete";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./CardPopUpComment.style.sass";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";

interface CommentForm {
    comment: string;
}

export const CardPopUpComment: React.FC<{
    comment: CommentType;
    card: CardType;
}> = ({ comment, card }) => {
    const { control, handleSubmit } = useForm<CommentForm>({
        defaultValues: { comment: comment.text },
    });
    const {
        isCommentChanging,
        handleOpenCommentEditor,
        handleCommentSubmit,
        handleRemoveComment,
    } = useCardCommentChange(comment, card);

    const onSubmit = (data: CommentForm) => {
        handleCommentSubmit(data.comment);
    };

    return (
        <div className="comment">
            <div className="comment__text">
                <p className="comment__user-name">{comment.author}</p>
                {isCommentChanging ? (
                    <form
                        className="comment__form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="comment"
                            control={control}
                            rules={{ required: true }}
                            render={({
                                field: { onBlur, value, onChange, ref },
                            }) => (
                                <textarea
                                    className="comment__textarea"
                                    onBlur={onBlur}
                                    value={value}
                                    onChange={onChange}
                                    ref={(e) => {
                                        ref(e);
                                        if (e) {
                                            e.style.height = "auto";
                                            e.style.height = `${e.scrollHeight}px`;
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
                    <p className="comment__comment">{comment.text}</p>
                )}
            </div>

            {!isCommentChanging && (
                <div className="comment__controls">
                    <ImageButton
                        icon={<SvgEdit />}
                        onClickFunction={handleOpenCommentEditor}
                    />
                    <ImageButton
                        icon={<SvgDelete />}
                        onClickFunction={handleRemoveComment}
                    />
                </div>
            )}
        </div>
    );
};
