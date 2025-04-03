import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { actions, selectors } from "../../app/store";
import { ColumnType } from "../../app/store/column/types";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { Column } from "../Column/Column";
import "./Board.style.sass";

export const Board: React.FC = () => {
    const dispatch = useAppDispatch();
    const columns = useAppSelector(selectors.column.selectAllColumns);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    if (!columns) {
        return <div>Loading...</div>;
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over?.id || !active.id) {
            return;
        }

        const targetColumnId = over.data.current?.columnId;

        if (targetColumnId) {
            dispatch(
                actions.card.moveCard({
                    cardId: active.id as string,
                    columnId: targetColumnId,
                })
            );
        }
    };

    return (
        <>
            <div className="board">
                <DndContext
                    sensors={[mouseSensor, touchSensor]}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    {columns.map((column: ColumnType) => (
                        <Column key={column.id} column={column} />
                    ))}
                </DndContext>
            </div>
        </>
    );
};
