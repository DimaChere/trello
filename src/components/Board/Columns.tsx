import { ColumnType } from "../../app/store/types";
import { useBoard } from "../../hooks/useBoard";
import { CardPopUp } from "../CardPopUp/CardPopUp";
import { Column } from "./Column";
import "./style.sass";

export const Columns: React.FC = () => {
    const { state } = useBoard();

    return (
        <>
            <div className="columns-wrapper">
                {state.columns.map((column: ColumnType) => {
                    return <Column key={column.id} column={column} />;
                })}
            </div>
            {state.currentPopupCard && (
                <CardPopUp cardInfo={state.currentPopupCard} />
            )}
        </>
    );
};
