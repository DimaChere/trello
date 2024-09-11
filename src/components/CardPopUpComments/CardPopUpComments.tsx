import { CardType } from "../../app/store/types";
import { useCardSendComment } from "../../hooks/useCardSendComment";
import SvgSend from "../../icons/components/Send";
import { ImageButton } from "../Buttons/ImageButton";
import { CardPopUpComment } from "../CardPopUpComment/CardPopUpComment";
import "./style.sass";

export const CardPopUpComments: React.FC<{ card: CardType }> = ({ card }) => {
    const { inputRef, setNewComment, handleCommentSubmit } =
        useCardSendComment(card);

    const hasComments = card.comments.length > 0;

    const commentsDescription = `${card.comments.length} комментариев`;

    return (
        <div className="card-comments">
            <p className="card__comments-description">{commentsDescription}</p>
            <div className="card-comments__send-comment">
                <textarea
                    className="card-comments__textarea"
                    ref={inputRef}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <div>
                    <ImageButton
                        icon={<SvgSend />}
                        additionalStyles="card-comments__send-button"
                        onClickFunction={handleCommentSubmit}
                    />
                </div>
            </div>
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
