import { useBoard } from "../../hooks/useBoard";
import { Column } from "./Column";
import "./style.sass";

export const Columns: React.FC = () => {
    const { state } = useBoard();

    return (
        <div className="columns-wrapper">
            {Object.keys(state.columns).map((columnId: string) => {
                return (
                    <Column key={columnId} column={state.columns[columnId]} />
                );
            })}
        </div>
    );
};
