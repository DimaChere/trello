import { Column } from "../Column/Column";
import "./Board.style.sass";
import { useAppSelector } from "../../app/store/store";
import { ColumnType } from "../../app/store/column/types";
import { selectors } from "../../app/store";

export const Board: React.FC = () => {
    const columns = useAppSelector(selectors.column.selectAllColumns);
    if (!columns) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="board">
                {columns.map((column: ColumnType) => (
                    <Column key={column.id} column={column} />
                ))}
            </div>
        </>
    );
};
