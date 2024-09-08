import { CardType } from "../../app/store/types";

export const CardPopUpComments: React.FC<{ card: CardType }> = ({ card }) => {
    return (
        <div className="card-pop-up__comments">
            <div className="card-pop-up__send-comment">
                <textarea className="card-pop-up__comment-input" />
                <div></div>
            </div>
            <div>
                {card.comments.length > 0 &&
                    card.comments.map((comment) => (
                        <div>
                            <p>{comment.author}</p>
                            <p>{comment.text}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};
