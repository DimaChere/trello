import { CardType } from "../../app/store/types";
import "./style.sass";
export const CardPopUp: React.FC<{ card: CardType }> = ({ card }) => {
    return (
        <div className="card-pop-up-background">
            <div className="card-pop-up">
                <div className="card-pop-up__header">
                    <p className="card-pop-up__title">{card.title}</p>
                </div>
                <p className="card-pop-up__description">{card.description}</p>
                {card.comments.length > 0 &&
                    card.comments.map((comment) => (
                        <div>
                            <p>{comment.author}</p>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                <div></div>
            </div>
        </div>
    );
};
