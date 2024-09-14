import { useState } from "react";
import "./LoginPopUp.style.sass";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../app/store/features/boardSlice";
import { RootState } from "../../app/store/store";

export const LoginPopUp: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.board.user);

    if (user) {
        return null;
    }

    const handleUserRegister = () => {
        dispatch(addUser({ userName }));
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
