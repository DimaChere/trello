import { RootState } from "../store";
import { CommentType } from "./types";

export const selectAllComments = (state: RootState): CommentType[] =>
    state.comment.comments;
