import { useReducer } from "react";
import { State } from "../../lib/types";
import { reducer } from "../../lib/reducer";
import { BoardContext } from "../../store/BoardContext";

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
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
