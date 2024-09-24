// src/context/BasketContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const BasketContext = createContext();

// Custom hook to use the basket context easily
export const useBasket = () => useContext(BasketContext);

// Provide the context to the entire app
export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (product) => {
    setBasketItems((prev) => [...prev, product]);
  };

  const removeFromBasket = (id) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BasketContext.Provider value={{ basketItems, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
