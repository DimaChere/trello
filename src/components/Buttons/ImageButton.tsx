import "./style.sass";
export const ImageButton: React.FC<{
    children: React.ReactNode;
    onClickFunction: (e: React.MouseEvent) => void;
    additionalStyles?: string;
}> = ({ children, onClickFunction, additionalStyles = "" }) => {
    return (
        <button
            onClick={onClickFunction}
            className={`button ${additionalStyles}`}
        >
            {children}
        </button>
    );
};
