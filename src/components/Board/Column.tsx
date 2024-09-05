import { useBoard } from "../../hooks/useBoard";
import { ColumnType } from "../../app/store/types";
import { Card } from "./Card";
import "./style.sass";

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
    const { dispatch } = useBoard();

    const addCard = () => {
        const newCard = {
            id: new Date().toISOString(),
            title: "New Card",
            description: "",
            column: column.id,
            comments: [],
        };
        dispatch({ type: "ADD_CARD", columnId: column.id, card: newCard });
    };

    return (
        <div>
            <hgroup>
                <h2 className="column-header-text">{column.title}</h2>
            </hgroup>

            <div className="column">
                <button onClick={addCard}>Add Card</button>
                {column.cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};
