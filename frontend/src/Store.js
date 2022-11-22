import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "",
  },
  userInfo: localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      let existItem = state.cart.cartItems.find(
        (item) =>
          item._id === newItem._id && item.sizeProduct === newItem.sizeProduct
      );
      // if (existItem) {
      //   if (existItem.sizeProduct !== newItem.sizeProduct) existItem = null;
      // }
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === newItem._id && item.sizeProduct === newItem.sizeProduct
              ? newItem
              : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    //? Chỉ lấy các sản phẩm khác id với id của product cần xóa và sản phẩm cùng id và khác size với product cần xóa
    case "CART_REMOVE_ITEM": {
      const removeItem = action.payload;
      console.log(removeItem);
      const cartItems = state.cart.cartItems.filter(
        (item) =>
          item._id !== removeItem._id ||
          (item._id === removeItem._id &&
            item.sizeProduct !== removeItem.sizeProduct)
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems: cartItems } };
    }
    case "USER_SIGNIN": {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
};
export function StoreProvider(props) {
  const [state, contextDispatch] = useReducer(reducer, initialState);
  const value = { state, contextDispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
