import { useState } from "react";
import "./LoginPopUp.style.sass";
import { useBoard } from "../../hooks/useBoard";
import { ACTION_TYPES } from "../../app/store/types";

export const LoginPopUp: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
    const { state, dispatch } = useBoard();

    if (state.user) {
        return null;
    }

    const handleUserRegister = () => {
        dispatch({ type: ACTION_TYPES.ADD_USER, payload: { userName } });
        setIsRegisterSuccess(true);
        setUserName("");
    };

    if (isRegisterSuccess) {
        return null;
    }

    return (
        <div className="pop-up-background">
            <div className="pop-up">
                <label className="pop-up__title">Пользователь:</label>
                <input
                    type="text"
                    className="pop-up__input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button className="pop-up__button" onClick={handleUserRegister}>
                    Зарегестрировать пользователя
                </button>
            </div>
        </div>
    );
};
