import { useBoard } from "../../hooks/useBoard";
import { CardTypes } from "../../app/store/types";

export const Card: React.FC<{ card: CardTypes }> = ({ card }) => {
    const { dispatch } = useBoard();

    const removeCard = () => {
        dispatch({
            type: "REMOVE_CARD",
            columnId: card.column,
            cardId: card.id,
        });
    };

    return (
        <div className="card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={removeCard}>Delete</button>
        </div>
    );
};
