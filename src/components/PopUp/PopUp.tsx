import { useState } from "react";
import "./style.sass";
import { useBoard } from "../../hooks/useBoard";

export const PopUp: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [isSuccessRegister, setIsSuccessRegister] = useState<boolean>(false);
    const { dispatch } = useBoard();

    const handleUserRegister = () => {
        dispatch({ type: "ADD_USER", userName });
        setIsSuccessRegister(true);
        setUserName("");
    };

    if (isSuccessRegister) {
        return null;
    }

    return (
        <div className="popup-wrapper">
            <div className="popup">
                <label className="name">Пользователь:</label>
                <input type="text" className="name-input" />
                <button className="name-register" onClick={handleUserRegister}>
                    Зарегестрировать пользователя
                </button>
            </div>
        </div>
    );
};
