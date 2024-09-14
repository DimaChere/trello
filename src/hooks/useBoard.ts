import { useContext } from "react";
import { CardContext } from "../app/store/CardContext";

export const useBoard = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
};
