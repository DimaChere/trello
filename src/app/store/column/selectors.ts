import { RootState } from "../store";
import { ColumnType } from "./types";

export const selectAllColumns = (state: RootState): ColumnType[] =>
    state.column;

export const selectColumnById = (
    state: RootState,
    columnId: number
): ColumnType | undefined =>
    state.column.find((column) => column.id === columnId);
