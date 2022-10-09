import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Slice/ProductSlice";
import UiReducer from "../Slice/uiSlice";
import CartReducer from "../Slice/CartSlice";
export default configureStore({
  reducer: {
    product: ProductReducer,
    ui: UiReducer,
    cart: CartReducer,
  },
});
