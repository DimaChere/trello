import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/store/store";
import { actions } from "../app/store";
import { ColumnType } from "../app/store/column";

export const useColumnTitleChange = (column: ColumnType) => {
    const dispatch = useAppDispatch();
    const [isNameChanging, setIsNameChanging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleOpenNameEditor = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNameChanging((prev) => !prev);
    };

    const handleTitleColumnSubmit = (newTitle: string) => {
        dispatch(
            actions.column.editColumn({
                id: column.id,
                updates: { title: newTitle },
            })
        );
        changeEditVisibility();
    };

    const changeEditVisibility = () => {
        setIsNameChanging((prev) => !prev);
    };

    useEffect(() => {
        if (isNameChanging && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isNameChanging]);

    return {
        isNameChanging,
        inputRef,
        handleOpenNameEditor,
        handleTitleCardSubmit: handleTitleColumnSubmit,
        changeEditVisibility,
    };
};
