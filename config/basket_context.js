import React, { useEffect, useState, useContext, createContext } from "react";

const BasketContext = createContext({
  productLines: [],
  addProductLine: () => {},
  total: 0,
});

export const Basket = ({ children }) => {
  const [productLines, setProductLines] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("product-lines");
    data && setProductLines(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("product-lines", JSON.stringify(productLines));
  }, [productLines]);

  const addProductLine = (newProduct) => {
    const index = productLines.findIndex((item) => item.id === newProduct.id);

    if (index >= 0) {
      const productAtIndex = productLines[index];
      productAtIndex.quantity = productAtIndex.quantity + 1;

      const prevCart = [...productLines];
      prevCart.splice(index, 1);

      setProductLines([...prevCart, productAtIndex]);
    } else {
      newProduct.quantity = 1;
      setProductLines([...productLines, newProduct]);
    }
    console.log(productLines);
  };

  const removeProductLine = (item, index) => {
    if (item.quantity >= 2) {
      const productAtIndex = productLines[index];
      productAtIndex.quantity = productAtIndex.quantity - 1;

      const prevCart = [...productLines];
      prevCart.splice(index, 1);

      setProductLines([...prevCart, productAtIndex]);
      console.log(productLines);
    } else {
      setProductLines(
        productLines.filter((i, x) => {
          return index !== x;
        })
      );
    }
  };

  useEffect(() => {
    let productTotal = productLines.map((el) => {
      return parseInt(el.price * el.quantity);
    });
    const basketTotal = productTotal.reduce((prev, cur) => {
      return prev + cur;
    }, 0);
    setTotal(basketTotal);
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
