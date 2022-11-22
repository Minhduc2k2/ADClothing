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
      const existItem = state.cart.cartItems.find(
        (item) =>
          item._id === newItem._id && item.sizeProduct === newItem.sizeProduct
      );
      const cartItems =
        existItem && existItem.sizeProduct === newItem.sizeProduct
          ? state.cart.cartItems.map((item) =>
              item._id === newItem._id &&
              existItem.sizeProduct === newItem.sizeProduct
                ? newItem
                : item
            )
          : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
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
