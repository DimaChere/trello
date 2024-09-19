import "./LoginPopUp.style.sass";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { actions, selectors } from "../../app/store";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
    name: string;
}

export const LoginPopUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectors.user.selectUser);
    const { register, handleSubmit } = useForm<LoginForm>();
    const onSubmit: SubmitHandler<LoginForm> = (data) =>
        dispatch(actions.user.addUser({ name: data.name }));

    if (user) {
        return null;
    }

    return (
        <div className="pop-up-background">
            <form onSubmit={handleSubmit(onSubmit)} className="pop-up">
                <label className="pop-up__title">Пользователь:</label>
                <input
                    {...register("name", {
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
