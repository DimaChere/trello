import "./style.sass";

type SubmitImageButtonType = {
    icon: React.ReactNode;
    additionalStyles?: string;
};

export const SubmitImageButton: React.FC<SubmitImageButtonType> = ({
    icon,
    additionalStyles = "",
}) => {
    return (
        <button type="submit" className={`button ${additionalStyles}`}>
            {icon}
        </button>
    );
};
