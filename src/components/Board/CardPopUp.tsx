import { ACTION_TYPES, CardType } from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import "./style.sass";
export const CardPopUp: React.FC<{ card: CardType }> = ({ card }) => {
    const { dispatch } = useBoard();
    const handleClosePopUp = () => {
        dispatch({ type: ACTION_TYPES.CLOSE_CARD_POPUP });
    };
    return (
        // <div className="card-pop-up-background">
        <div className="card-pop-up">
            <button
                className="card-pop-up__close button"
                onClick={handleClosePopUp}
            >
                <img src="/Close.svg" alt="Close" />
            </button>
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
        // </div>
    );
};
