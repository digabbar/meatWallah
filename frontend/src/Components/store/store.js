import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../slice/productSlice";
import ProductDetailsReducer from "../slice/productDetailSlice";
import AuthReducer from "../slice/authSlice";
import UserReducer from "../slice/userSlice";
import ForgetReducer from "../slice/forgetSlice";
export default configureStore({
  reducer: {
    product: ProductReducer,
    productDetail: ProductDetailsReducer,
    auth: AuthReducer,
    user: UserReducer,
    forget: ForgetReducer,
  },
});
