import { RootState } from "../store";
import { UserType } from "./types";

export const selectUser = (state: RootState): UserType | null =>
    state.user.user;
