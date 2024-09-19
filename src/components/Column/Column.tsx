import { Card } from "../Card/Card";
import "./Column.style.sass";
import { v4 as uuidv4 } from "uuid";
import SvgAdd from "../../icons/components/Add";
import { ImageButton } from "../Buttons/ImageButton";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { ColumnType } from "../../app/store/column/types";
import { CardType } from "../../app/store/card/types";
import { actions, selectors } from "../../app/store";

export const Column: React.FC<{ column: ColumnType }> = ({ column }) => {
    const dispatch = useAppDispatch();

    const handleAddCard = () => {
        const newCard: CardType = {
            id: uuidv4(),
            title: "New Card",
            description: null,
            columnId: column.id,
            comments: [],
        };

        dispatch(actions.card.addCard({ columnId: column.id, card: newCard }));
    };

    const cards = useAppSelector((state) =>
        selectors.card.selectCardsFromColumnId(state, column.id)
    );

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
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};
