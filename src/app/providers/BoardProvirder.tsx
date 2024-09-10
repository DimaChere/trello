import { PropsWithChildren, useReducer, useState } from "react";
import { CurrentCardPopupType, State } from "../store/types";
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
          };

    const [state, dispatch] = useReducer(reducerWithStorage, initialState);

    const [currentCardPopup, setCurrentCardPopup] =
        useState<CurrentCardPopupType | null>(null);

    const openCardPopup = (currentCardPopUp: CurrentCardPopupType) => {
        setCurrentCardPopup(currentCardPopUp);
    };

    const closeCardPopup = () => {
        setCurrentCardPopup(null);
    };

    return (
        <BoardContext.Provider
            value={{
                state,
                currentCardPopup,
                dispatch,
                openCardPopup,
                closeCardPopup,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
