import "./style.sass";

type ImageButtonType = {
    icon: React.ReactNode;
    additionalStyles?: string;
    onClickFunction: (e: React.MouseEvent) => void;
};

export const ImageButton: React.FC<ImageButtonType> = ({
    icon,
    additionalStyles = "",
    onClickFunction,
}) => {
    return (
        <button
            onClick={onClickFunction}
            className={`button ${additionalStyles}`}
        >
            {icon}
        </button>
    );
};
