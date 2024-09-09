import { PropsWithChildren, useReducer } from "react";
import { State } from "../store/types";
import { reducerWithStorage } from "../store/reducer";
import { BoardContext } from "../store/BoardContext";

export const BoardProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const savedState: string | null = localStorage.getItem("appState");

    const initialState: State = savedState
        ? JSON.parse(savedState)
        : {
              columns: [
                  { id: 1, title: "TODO", cards: [] },
                  { id: 2, title: "In Progress", cards: [] },
                  { id: 3, title: "Testing", cards: [] },
                  { id: 4, title: "Done", cards: [] },
              ],
              user: "",
              currentPopupCard: null,
          };

    const [state, dispatch] = useReducer(reducerWithStorage, initialState);

    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            {children}
        </BoardContext.Provider>
    );
};
