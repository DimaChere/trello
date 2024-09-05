import { useBoard } from "../../hooks/useBoard";
import { ACTION_TYPES, CardType } from "../../app/store/types";

export const Card: React.FC<{ card: CardType }> = ({ card }) => {
    const { dispatch } = useBoard();

    const removeCard = () => {
        dispatch({
            type: ACTION_TYPES.REMOVE_CARD,
            payload: { columnId: card.columnId, cardId: card.id },
        });
    };

    return (
        <div className="Card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={removeCard}>Delete</button>
        </div>
    );
};
