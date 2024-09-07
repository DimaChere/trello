import { useBoard } from "../../hooks/useBoard";
import { ACTION_TYPES, CardType, ColumnType } from "../../app/store/types";
import { Card } from "./Card";
import "./style.sass";
import { v4 as uuidv4 } from "uuid";

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
    const { dispatch } = useBoard();

    const handleAddCard = () => {
        const newCard: CardType = {
            id: uuidv4(),
            title: "New Card",
            description: null,
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
                <h2 className="column-header__title">{column.title}</h2>
            </hgroup>

            <div className="column">
                <div className="column__controls">
                    <button
                        onClick={handleAddCard}
                        className="column__add-card button"
                    >
                        <img src="/Add.svg" alt="Add card" />
                    </button>
                </div>
                <div className="column__cards">
                    {column.cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};
