import React, { useEffect, useState, useContext, createContext } from "react";

const BasketContext = createContext({
  productLines: [],
  addProductLine: () => {},
  total: 0,
});

export const Basket = ({ children }) => {
  const [productLines, setProductLines] = useState([]);
  const [total, setTotal] = useState(0);

  // const addProductLine = (newProduct) => {
  //   setProductLines([...productLines, newProduct])
  //   console.log(productLines)
  // };

  const addProductLine = (newProduct) => {
    const index = productLines.findIndex((item) => item.id === newProduct.id);

    if (index >= 0) {
      const productAtIndex = productLines[index];
      productAtIndex.quantity = productAtIndex.quantity + 1;

      const prevCart = [...productLines];
      prevCart.splice(index, 1);

      setProductLines([prevCart, productAtIndex]);
    } else {
      newProduct.quantity = 1;
      setProductLines([...productLines, newProduct]);
    }
    // console.log(productLines)
  };

  const removeProductLine = (index) => {
    setProductLines(
      productLines.filter((i, x) => {
        return index !== x;
      })
    );
  };

  // useEffect(() => {
  //   let prisen = productLines.map(el => {
  //     let price = Number(el.price * el.quantity)
  //     return price
  //   })
  //   console.log(prisen)
  //   const total = prisen.map(el => Number(el.price) * Number(el.quantity)).reduce((prev, cur) => {
  //     return prev + cur
  //   }, 0);
  //   // console.log(total)
  //   setTotal(total);
  // }, [productLines]);

  useEffect(() => {
    const calcSum = productLines.forEach((item) => {
      let a = item.price;
      let b = item.quantity;
      return Number(a * b);
    });

    console.log(calcSum);

    // console.log(total)
    setTotal(calcSum);
  }, [productLines]);

  // useEffect(() => {

  //   const total = productLines.reduce((prev, cur) => {
  //     return prev + cur.price
  //   }, 0);
  //   setTotal(total);
  // }, [productLines]);
  // useEffect(() => {

  //   // Sum the totals
  //   productLines.map(li => li.total).reduce(sumReducer, 0);

  //   // Sum the quantities using the same reducer
  //   productLines.map(li => li.quantity).reduce(sumReducer, 0);

  //   function sumReducer(sum, val) {
  //     return sum + val;
  //   }

  //   const total = productLines.reduce((prev, cur) => {
  //     return prev + cur.price
  //   }, 0);
  //   setTotal(total);
  // }, [productLines]);

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
