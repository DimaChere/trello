import "./LoginPopUp.style.sass";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { actions, selectors } from "../../app/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
    name: string;
}

export const LoginPopUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectors.user.selectUser);
    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            name: "",
        },
    });
    const onSubmit: SubmitHandler<LoginForm> = (data) =>
        dispatch(actions.user.addUser({ name: data.name }));

    if (user) {
        return null;
    }

    return (
        <div className="pop-up-background">
            <form onSubmit={handleSubmit(onSubmit)} className="pop-up">
                <label className="pop-up__title">Пользователь:</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true, maxLength: 20 }}
                    render={({ field: { onBlur, value, onChange } }) => (
                        <input
                            className="pop-up__input"
                            onBlur={onBlur}
                            value={value}
                            onChange={onChange}
                        />
                    )}
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
