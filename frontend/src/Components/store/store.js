import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "../slice/productSlice";
import ProductDetailsReducer from "../slice/productDetailSlice";
import AuthReducer from "../slice/authSlice";
import UserReducer from "../slice/userSlice";
import ForgetReducer from "../slice/forgetSlice";
import CartReducer from "../slice/cartSlice";
import NewOrderReducer from "../slice/newOrderSlice";

import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, CartReducer);

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    productDetail: ProductDetailsReducer,
    auth: AuthReducer,
    user: UserReducer,
    forget: ForgetReducer,
    cart: persistedReducer,
    newOrder: NewOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
