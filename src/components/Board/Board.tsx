import { ColumnType } from "../../app/store/types";
import { Column } from "../Column/Column";
import "./Board.style.sass";
import { useAppSelector } from "../../app/store/store";
import { selectAllColumns } from "../../app/store/column/selectors";

export const Board: React.FC = () => {
    const columns = useAppSelector(selectAllColumns);
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
