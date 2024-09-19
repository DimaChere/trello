import { useForm } from "react-hook-form";
import { CardType } from "../../app/store/card/types";
import { useCardSendComment } from "../../hooks/useCardSendComment";
import SvgSend from "../../icons/components/Send";
import { CardPopUpComment } from "../CardPopUpComment/CardPopUpComment";
import "./CardPopUpComments.style.sass";
import { SubmitImageButton } from "../Buttons/SubmitImageButton";
import { useEffect, useRef } from "react";

interface CommentForm {
    comment: string;
}

export const CardPopUpComments: React.FC<{ card: CardType }> = ({ card }) => {
    const { handleCommentSubmit } = useCardSendComment(card);

    const { register, watch, handleSubmit, reset } = useForm<CommentForm>();
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const watchComment = watch(["comment"]);

    const onSubmit = (data: CommentForm) => {
        handleCommentSubmit(data.comment);
        reset();
    };

    useEffect(() => {
        if (commentRef.current) {
            commentRef.current.style.height = "auto";
            commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
        }
    }, [watchComment]);

    const hasComments = card.comments.length > 0;

    const commentsDescription = `${card.comments.length} комментариев`;

    return (
        <div className="card-comments">
            <p className="card__comments-description">{commentsDescription}</p>
            <form
                className="card-comments__send-comment"
                onSubmit={handleSubmit(onSubmit)}
            >
                <textarea
                    className="card-comments__textarea"
                    {...register("comment", { required: true })}
                    ref={(e) => {
                        commentRef.current = e;
                        register("comment").ref(e);
                    }}
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
