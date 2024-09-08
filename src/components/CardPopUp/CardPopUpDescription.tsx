import { CardType } from "../../app/store/types";

export const CardPopUpDescription: React.FC<{ card: CardType }> = ({
    card,
}) => {
    return (
        <div className="card-pop-up__description">
            <div className="card-pop-up__description-text">
                <p>Описание</p>
                <p className="card-pop-up__description">
                    {card.description ? (
                        <p>{card.description}</p>
                    ) : (
                        <p>Описание отсутствует</p>
                    )}
                </p>
            </div>
            <div className="card-pop-up__description-edit"></div>
        </div>
    );
};
