import { createContext, useEffect, useMemo, useReducer } from "react";
import { shopReducer } from "./shopReducer";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [shopState, shopDispatch] = useReducer(shopReducer, {
    fishList: [],
  });

  useEffect(() => {
    if (localStorage.getItem('fishList')) {
      shopDispatch({ type: 'ADD_TO_CART', payload: JSON.parse(localStorage.getItem('fishList')) });
    }
  }, []);

  const contextValue = useMemo(() => ({
    shopState,
    shopDispatch
  }), [shopState, shopDispatch]);

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
}

export default ShopContextProvider;