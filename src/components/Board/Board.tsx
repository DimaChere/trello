import { ColumnType } from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { CardPopUp } from "../Card/CardPopUp/CardPopUp";
import { Column } from "../Column/Column";
import "./style.sass";

export const Board: React.FC = () => {
    const { state, currentCardPopup } = useBoard();

    return (
        <>
            <div className="board">
                {state.columns.map((column: ColumnType) => {
                    return <Column key={column.id} column={column} />;
                })}
            </div>
            {currentCardPopup && <CardPopUp cardInfo={currentCardPopup} />}
        </>
    );
};
