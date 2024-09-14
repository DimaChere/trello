import { CardType, ColumnType } from "../../app/store/types";
import { Card } from "../Card/Card";
import "./Column.style.sass";
import { v4 as uuidv4 } from "uuid";
import SvgAdd from "../../icons/components/Add";
import { ImageButton } from "../Buttons/ImageButton";
import { useDispatch } from "react-redux";
import { addCard } from "../../app/store/features/boardSlice";

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
    const dispatch = useDispatch();

    const handleAddCard = () => {
        const newCard: CardType = {
            id: uuidv4(),
            title: "New Card",
            description: null,
            columnId: column.id,
            comments: [],
        };

        dispatch(addCard({ columnId: column.id, card: newCard }));
    };

    return (
        <div>
            <hgroup>
                <h2 className="column-header__title">{column.title}</h2>
            </hgroup>

            <div className="column">
                <div className="column__controls">
                    <ImageButton
                        icon={<SvgAdd />}
                        additionalStyles="column__add-card"
                        onClickFunction={handleAddCard}
                    />
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
