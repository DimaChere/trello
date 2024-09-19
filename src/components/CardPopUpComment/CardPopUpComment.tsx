import { useForm } from "react-hook-form";
import { CardType, CommentType } from "../../app/store/card/types";
import { useCardCommentChange } from "../../hooks/useCardCommentChange";
import SvgDelete from "../../icons/components/Delete";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";
import { ImageButton } from "../Buttons/ImageButton";
import "./CardPopUpComment.style.sass";
import { useEffect, useRef } from "react";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";

interface CommentForm {
    comment: string;
}

export const CardPopUpComment: React.FC<{
    comment: CommentType;
    card: CardType;
}> = ({ comment, card }) => {
    const { register, watch, handleSubmit } = useForm<CommentForm>();
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const watchComment = watch(["comment"]);
    const {
        isCommentChanging,
        handleOpenCommentEditor,
        handleCommentSubmit,
        handleRemoveComment,
    } = useCardCommentChange(comment, card);

    const onSubmit = (data: CommentForm) => {
        handleCommentSubmit(data.comment);
    };

    useEffect(() => {
        if (commentRef.current) {
            commentRef.current.style.height = "auto";
            commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
        }
    }, [watchComment]);

    return (
        <div className="comment">
            <div className="comment__text">
                <p className="comment__user-name">{comment.author}</p>
                {isCommentChanging ? (
                    <form
                        className="comment__form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <textarea
                            className="comment__textarea"
                            {...register("comment", {
                                required: true,
                                value: comment.text,
                            })}
                            ref={(e) => {
                                commentRef.current = e;
                                register("comment").ref(e);
                            }}
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
