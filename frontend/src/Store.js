import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
  userInfo: localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
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
