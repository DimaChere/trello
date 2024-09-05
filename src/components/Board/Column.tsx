import { useBoard } from "../../hooks/useBoard";
import { ACTION_TYPES, CardType, ColumnType } from "../../app/store/types";
import { Card } from "./Card";
import "./style.sass";

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
    const { dispatch } = useBoard();

    const handleAddCard = () => {
        const newCard: CardType = {
            id: Number(new Date()),
            title: "New Card",
            description: "",
            columnId: column.id,
            comments: [],
        };

        dispatch({
            type: ACTION_TYPES.ADD_CARD,
            payload: { columnId: column.id, card: newCard },
        });
    };

    return (
        <div>
            <hgroup>
                <h2 className="Column-Header_Text">{column.title}</h2>
            </hgroup>

            <div className="Column">
                <button onClick={handleAddCard}>Add Card</button>
                {column.cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};
