import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { CardType } from "../app/store/card";
import { actions, selectors } from "../app/store";

export const useCardSendComment = (card: CardType) => {
    const user = useAppSelector(selectors.user.selectUser);
    const dispatch = useAppDispatch();

    const handleCommentSubmit = (commentText: string) => {
        if (commentText.trim()) {
            dispatch(
                actions.comment.addComment({
                    cardId: card.id,
                    comment: {
                        id: uuidv4(),
                        author: user?.name || "anonymous",
                        text: commentText.trim(),
                    },
                })
            );
        }
    };

    return { handleCommentSubmit };
};
