import { useBoard } from "../../hooks/useBoard";
import { CardTypes } from "../../lib/types";

export const Card = ({ card }: { card: CardTypes }) => {
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
