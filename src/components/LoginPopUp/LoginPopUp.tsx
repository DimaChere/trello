import "./LoginPopUp.style.sass";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../app/store/features/boardSlice";
import { RootState } from "../../app/store/store";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
    userName: string;
}

export const LoginPopUp: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.board.user);
    const { register, handleSubmit } = useForm<LoginForm>();
    const onSubmit: SubmitHandler<LoginForm> = (data) =>
        dispatch(addUser({ userName: data.userName }));

    if (user) {
        return null;
    }

    return (
        <div className="pop-up-background">
            <form onSubmit={handleSubmit(onSubmit)} className="pop-up">
                <label className="pop-up__title">Пользователь:</label>
                <input
                    {...register("userName", {
                        required: true,
                        maxLength: 20,
                    })}
                    className="pop-up__input"
                />
                <input
                    type="submit"
                    className="pop-up__button"
                    value="Зарегистрировать пользователя"
                />
            </form>
        </div>
    );
};
