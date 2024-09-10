import { CardType, CommentType } from "../../app/store/types";
import { useCardCommentChange } from "../../hooks/useCardCommentChange";
import SvgDelete from "../../icons/components/Delete";
import SvgDone from "../../icons/components/Done";
import SvgEdit from "../../icons/components/Edit";

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
    } = useCardCommentChange(comment, card);

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
                            className="button button--apply-changes"
                            onClick={handleCommentSubmit}
                        >
                            <SvgDone />
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
                        <SvgEdit />
                    </button>
                    <button className="button" onClick={handleRemoveComment}>
                        <SvgDelete />
                    </button>
                </div>
            )}
        </div>
    );
};
