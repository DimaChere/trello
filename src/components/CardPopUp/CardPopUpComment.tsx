import { CardType, CommentType } from "../../app/store/types";
import { useCardCommentControls } from "../../hooks/useCardCommentControls";

export const CardPopUpComment: React.FC<{
    comment: CommentType;
    card: CardType;
}> = ({ comment, card }) => {
    const {
        isCommentChanging,
        newComment,
        inputRef,
        setNewComment,
        handleOpenCommentEditor,
        handleCommentSubmit,
        handleRemoveComment,
    } = useCardCommentControls(comment, card);
    return (
        <div className="comment">
            <div className="comment__text">
                <p className="comment__user-name">{comment.author}</p>
                {isCommentChanging ? (
                    <>
                        <textarea
                            name="newComment"
                            id="new-comment"
                            className="comment__textarea"
                            value={newComment}
                            ref={inputRef}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button
                            className="button apply-changes-button"
                            onClick={handleCommentSubmit}
                        >
                            <img src="/Done.svg" alt="Сохранить" />
                        </button>
                    </>
                ) : (
                    <p className="comment__comment">{comment.text}</p>
                )}
            </div>
            {!isCommentChanging && (
                <div className="comment__controls">
                    <button
                        className="button"
                        onClick={handleOpenCommentEditor}
                    >
                        <img src="/Edit.svg" alt="Изменить" />
                    </button>
                    <button className="button" onClick={handleRemoveComment}>
                        <img src="/Delete.svg" alt="Удалить" />
                    </button>
                </div>
            )}
        </div>
    );
};
