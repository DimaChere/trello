import { CardType } from "../../app/store/types";
import { useCardSendComment } from "../../hooks/useCardSendComment";
import SvgSend from "../../icons/components/Send";
import { ImageButton } from "../ImageButton";
import { CardPopUpComment } from "./CardPopUpComment";

export const CardPopUpComments: React.FC<{ card: CardType }> = ({ card }) => {
    const { inputRef, setNewComment, handleCommentSubmit } =
        useCardSendComment(card);

    return (
        <div className="card-comments">
            <p className="card__comments-description">
                {card.comments.length} <span>Комментариев</span>
            </p>
            <div className="card-comments__send-comment">
                <textarea
                    className="card-comments__textarea"
                    ref={inputRef}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <div>
                    <ImageButton
                        onClickFunction={handleCommentSubmit}
                        additionalStyles="card-comments__send-button"
                    >
                        <SvgSend />
                    </ImageButton>
                </div>
            </div>
            <div className="card-comments__comments-block">
                {card.comments.length > 0 &&
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
