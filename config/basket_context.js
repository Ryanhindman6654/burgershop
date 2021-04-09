import React, { useEffect, useState, useContext, createContext } from "react";

const BasketContext = createContext({
  productLines: [],
  addProductLine: () => {},
  total: 0,
});

export const Basket = ({ children }) => {
  const [productLines, setProductLines] = useState([]);
  const [total, setTotal] = useState(0);

  const addProductLine = (newProduct) => {
    setProductLines([...productLines, newProduct]);
  };

  const removeProductLine = (index) => {
    setProductLines(
      productLines.filter((i, x) => {
        return index !== x;
      })
    );
  };

  useEffect(() => {
    const total = productLines.reduce((prev, cur) => {
      return prev + cur.price;
    }, 0);
    setTotal(total);
  }, [productLines]);

  return (
    <BasketContext.Provider
      value={{ productLines, addProductLine, removeProductLine, total }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const BasketConsumer = BasketContext.Consumer;

export const useBasket = () => {
  return useContext(BasketContext);
};
