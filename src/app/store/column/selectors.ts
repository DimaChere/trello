import { RootState } from "../store";
import { ColumnType } from "./types";

export const selectAllColumns = (state: RootState): ColumnType[] =>
    state.column.columns;

export const selectColumnById = (
    state: RootState,
    columnId: number
): ColumnType | undefined =>
    state.column.columns.find((column) => column.id === columnId);
