import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./card/card-slice";
import columnReducer from "./column/column-slice";
import commentReducer from "./comment/comment-slice";
import userReducer from "./user/user-slice"; // Импортируем редьюсер пользователя
import storage from "redux-persist/lib/storage"; // Импортируем хранилище
import { persistReducer, persistStore } from "redux-persist"; // Импортируем библиотеку для сохранения
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
    key: "root",
    storage,
};

const cardPersistedReducer = persistReducer(persistConfig, cardReducer);
const columnPersistedReducer = persistReducer(persistConfig, columnReducer);
const commentPersistedReducer = persistReducer(persistConfig, commentReducer);
const userPersistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        card: cardPersistedReducer,
        column: columnPersistedReducer,
        comment: commentPersistedReducer,
        user: userPersistedReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type StoreType = typeof store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
