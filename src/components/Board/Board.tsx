import { useSelector } from "react-redux";
import { ColumnType } from "../../app/store/types";
import { Column } from "../Column/Column";
import "./Board.style.sass";
import { RootState } from "../../app/store/store";

export const Board: React.FC = () => {
    const columns = useSelector((state: RootState) => state.board.columns);
    if (!columns) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="board">
                {columns.map((column: ColumnType) => {
                    return <Column key={column.id} column={column} />;
                })}
            </div>
        </>
    );
};
