import { Controller, useForm } from "react-hook-form";
import { CardType } from "../../app/store/card/types";
import { useCardSendComment } from "../../hooks/useCardSendComment";
import SvgSend from "../../icons/components/Send";
import { CardPopUpComment } from "../CardPopUpComment/CardPopUpComment";
import "./CardPopUpComments.style.sass";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";

interface CommentForm {
    comment: string;
}

export const CardPopUpComments: React.FC<{ card: CardType }> = ({ card }) => {
    const { handleCommentSubmit } = useCardSendComment(card);

    const { control, handleSubmit, reset } = useForm<CommentForm>({
        defaultValues: { comment: "" },
    });

    const onSubmit = (data: CommentForm) => {
        handleCommentSubmit(data.comment);
        reset();
    };

    const hasComments = card.comments.length > 0;

    const commentsDescription = `${card.comments.length} комментариев`;

    return (
        <div className="card-comments">
            <p className="card__comments-description">{commentsDescription}</p>
            <form
                className="card-comments__send-comment"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="comment"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onBlur, value, onChange, ref } }) => (
                        <textarea
                            className="card-comments__textarea"
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
                <div>
                    <SubmitImageButton
                        icon={<SvgSend />}
                        additionalStyles="card-comments__send-button"
                    />
                </div>
            </form>
            <div className="card-comments__comments-block">
                {hasComments &&
                    card.comments.map((comment) => (
                        <CardPopUpComment
                            key={comment.id}
                            comment={comment}
                            card={card}
                        />
                    ))}
            </div>
        </div>
    );
};
