import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "../slice/productSlice";
import ProductDetailsReducer from "../slice/productDetailSlice";
import AuthReducer from "../slice/authSlice";
import UserReducer from "../slice/userSlice";
import ForgetReducer from "../slice/forgetSlice";
import CartReducer from "../slice/cartSlice";
import NewOrderReducer from "../slice/newOrderSlice";
import MyOrderReducer from "../slice/myOrderSlice";
import OrderDetailReducer from "../slice/orderDetailSlice";
import NewReviewReducer from "../slice/newReviewSlice";
import NewProductReducer from "../slice/createNewProductSlice";
import DeleteProductReducer from "../slice/deleteProductSlice";
import UpdateProductReducer from "../slice/updateProductSlice";
import AllOrderReducer from "../slice/allOrderSlice";
import DeleteOrderReducer from "../slice/deleteOrderSlice";
import UpdateOrderReducer from "../slice/updateOrderSlice";
import AllUserReducer from "../slice/allUserSlice";
import UserDetailReducer from "../slice/userDetailSlice";
import UpdateUserReducer from "../slice/updateUserSlice";
import DeleteUserReducer from "../slice/deleteUserSlice";
import DeleteReviewReducer from "../slice/deleteReviewSlice";
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
    myOrder: MyOrderReducer,
    orderDetail: OrderDetailReducer,
    review: NewReviewReducer,
    newProduct: NewProductReducer,
    deleteProduct: DeleteProductReducer,
    updateProduct: UpdateProductReducer,
    allOrder: AllOrderReducer,
    deleteOrder: DeleteOrderReducer,
    updateOrder: UpdateOrderReducer,
    allUser: AllUserReducer,
    userDetail: UserDetailReducer,
    updateUser: UpdateUserReducer,
    deleteUser: DeleteUserReducer,
    deleteReview: DeleteReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
