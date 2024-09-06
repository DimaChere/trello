import { PropsWithChildren, useReducer } from "react";
import { State } from "../store/types";
import { reducer } from "../store/reducer";
import { BoardContext } from "../store/BoardContext";

export const BoardProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const initialState: State = {
        columns: [
            { id: 1, title: "TODO", cards: [] },
            { id: 2, title: "In Progress", cards: [] },
            { id: 3, title: "Testing", cards: [] },
            { id: 4, title: "Done", cards: [] },
        ],
        user: "",
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            {children}
        </BoardContext.Provider>
    );
};
