import { useState } from "react";
import "./LoginPopUp.style.sass";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { actions, selectors } from "../../app/store";

export const LoginPopUp: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectors.user.selectUser);

    if (user) {
        return null;
    }

    const handleUserRegister = () => {
        dispatch(actions.user.addUser({ name: userName }));
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
