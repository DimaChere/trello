import { useState } from "react";
import "./style.sass";
import { useBoard } from "../../hooks/useBoard";
import { ACTION_TYPES } from "../../app/store/types";

export const PopUp: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
    const { dispatch } = useBoard();

    const handleUserRegister = () => {
        dispatch({ type: ACTION_TYPES.ADD_USER, payload: { userName } });
        setIsRegisterSuccess(true);
        setUserName("");
    };

    if (isRegisterSuccess) {
        return null;
    }

    return (
        <div className="PopUp-Wrapper">
            <div className="PopUp">
                <label className="PopUp-Heading">Пользователь:</label>
                <input type="text" className="PopUp-UserName_Input" />
                <button
                    className="PopUp-UserName_RegisterBtn"
                    onClick={handleUserRegister}
                >
                    Зарегестрировать пользователя
                </button>
            </div>
        </div>
    );
};
