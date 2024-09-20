import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cardSlice from "./card/card-slice";
import columnSlice from "./column/column-slice";
import commentSlice from "./comment/comment-slice";
import userSlice from "./user/user-slice";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
    key: "root",
    storage,
};

const boardReducer = combineReducers({
    user: userSlice,
    column: columnSlice,
    cards: cardSlice,
    comments: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, boardReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type StoreType = typeof store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
