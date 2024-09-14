import { PropsWithChildren, useState } from "react";
import { CurrentCardPopupType } from "../store/types";
import { CardContext } from "../store/CardContext";

export const BoardProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentCardPopup, setCurrentCardPopup] =
        useState<CurrentCardPopupType | null>(null);

    const openCardPopup = (currentCardPopUp: CurrentCardPopupType) => {
        setCurrentCardPopup(currentCardPopUp);
    };

    const closeCardPopup = () => {
        setCurrentCardPopup(null);
    };

    return (
        <CardContext.Provider
            value={{
                currentCardPopup,
                openCardPopup,
                closeCardPopup,
            }}
        >
            {children}
        </CardContext.Provider>
    );
};
