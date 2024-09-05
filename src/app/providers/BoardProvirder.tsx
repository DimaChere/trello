import { PropsWithChildren, useReducer } from "react";
import { State } from "../store/types";
import { reducer } from "../store/reducer";
import { BoardContext } from "../store/BoardContext";

export const BoardProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const initialState: State = {
        columns: {
            todo: { id: "todo", title: "TODO", cards: [] },
            inProgress: { id: "inProgress", title: "In Progress", cards: [] },
            testing: { id: "testing", title: "Testing", cards: [] },
            done: { id: "done", title: "Done", cards: [] },
        },
        users: [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            {children}
        </BoardContext.Provider>
    );
};
