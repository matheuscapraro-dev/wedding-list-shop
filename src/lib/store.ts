import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/components/storage"; // Assumindo que este é seu storage customizado
import productsReducer from "./features/products/productsSlice";
import cartsReducer from "./features/carts/cartsSlice";
import userReducer from "./features/user/userSlice"; // 1. Importe o novo userReducer

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["carts", "user"], // 2. Adicione 'user' à whitelist para persistência
};

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  user: userReducer, // 3. Adicione o userReducer ao rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// As exportações de tipos permanecem as mesmas e funcionarão corretamente
const store = makeStore().store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
