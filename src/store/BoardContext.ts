import { createContext } from "react";
import { Action, State } from "../lib/types";

export const BoardContext = createContext<
    | {
          state: State;
          dispatch: React.Dispatch<Action>;
      }
    | undefined
>(undefined);
