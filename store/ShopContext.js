import { createContext, useEffect, useMemo, useReducer } from "react";
import { shopReducer } from "./shopReducer";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [shopState, shopDispatch] = useReducer(shopReducer, {
    fishList: [],
    isDark: null,
    isLoading: false,
  });

  useEffect(() => {
    if (localStorage.getItem('fishList')) {
      shopDispatch({ type: 'SET_CART', payload: JSON.parse(localStorage.getItem('fishList')) });
    }
    if (localStorage.getItem('darkMode')) {
      shopDispatch({ type: 'SET_DARK', payload: true });
    } else {
      shopDispatch({ type: 'SET_DARK', payload: false });
    }
  }, []);

  const contextValue = useMemo(() => ({
    shopState,
    shopDispatch
  }), [shopState, shopDispatch]);

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
}

export default ShopContextProvider;