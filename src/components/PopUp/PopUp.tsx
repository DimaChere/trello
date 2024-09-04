import { useState } from "react";
import "../../styles/PopUp/PopUp.sass";
import { useBoard } from "../../hooks/useBoard";

export const PopUp = () => {
    const [userName, setUserName] = useState<string>("");
    const [successRegister, setSuccessRegister] = useState<boolean>(false);
    const { dispatch } = useBoard();

    const registerUser = () => {
        dispatch({ type: "ADD_USER", userName });
        setSuccessRegister(true);
        setUserName("");
    };

    if (successRegister) {
        return null;
    }

    return (
        <div className="popup-wrapper">
            <div className="popup">
                <label className="name">Пользователь:</label>
                <input type="text" className="name-input" />
                <button
                    className="name-register"
                    onClick={() => registerUser()}
                >
                    Зарегестрировать пользователя
                </button>
            </div>
        </div>
    );
};
