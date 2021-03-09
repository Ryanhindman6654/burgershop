import firebaseInstance from '../config/firebase'
import styled from 'styled-components'
import React, {useState} from 'react'
import Head from 'next/head'
import {useBasket} from '../config/basket_context'

function Menu({ productsArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

  const basket = useBasket();

  // const [cart, setCart] = useState([])

  function handleOrderClick() {

    const orderCollection = firebaseInstance.firestore().collection('orders');
    orderCollection.doc().set({
      user: 'marius.tetlie@gmail.com',
      ordernumber: 1234,
      order: cart.map(item => {
        return (
          {
            title: item.title,
            price: item.price,
            amount: 8
          }
        )
      }),
      packaged: false,
      delivered: false,
      // total_price: cart.forEach(item => item.price +)
    })
      .then(() => {
        console.log('Lagt til');
        console.log(orderCollection)
        // state, en melding dukker opp om at det er lagt til
        // brukeren blir sendt videre? —>
      })
      .catch(error => {
        console.error(error);
      })

  };

  // function handleProductClick(productId) {

  //   const newProduct = productsArray.find(product => product.id === productId)
  //   setCart(prevCart => [...prevCart, newProduct] )
  //   console.log(cart)

  // };

  return (
    <main>
      <Head>
        <title>Basket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle>Cart</PageTitle>
      <div>
        <ul>
          {basket.productLines.map(item => {
            return (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <button onClick={() => {
                  const newProduct = productsArray.find(product => product.id === item.id)
                  basket.addProductLine(newProduct)
                }}>
                  Legg til
                </button>
              </li>
            )
          })}
        </ul>
        <p>Total: {basket.total}</p>
        <button
          onClick={() => handleOrderClick()}
        >Send inn bestilling</button>
      </div>
      
      <PageTitle>Meny</PageTitle>
      <MenuList>
        {productsArray.map(item => {
          return (
            <MenuItem vegetarian={item.vegetarian} key={item.id}>
              <ProductTitle>{item.title}</ProductTitle>
              {item.vegetarian && <p>Vegetarian</p>}
              {item.contents && 
                <p>
                  {item.contents.map(item => {
                    return <ProductContentItem key={item}>{item}</ProductContentItem>
                  })}
                </p>
              }
              <p>{item.price},-</p>
              <button onClick={() => {
                const newProduct = productsArray.find(product => product.id === item.id)
                basket.addProductLine(newProduct)
                }}>
                Legg til
              </button>
            </MenuItem>
          )
        })}
      </MenuList>
    </main>
  );
};

Menu.getInitialProps = async () => {

  try {
    const productsCollection = await firebaseInstance.firestore().collection('products');
    const productsData = await productsCollection.get();

    let productsArray = [];
    productsData.forEach(product => {
      productsArray.push({
        id: product.id,
        ...product.data()
      });
    });

    return { productsArray }

  } catch (error) {
    return {
      error: error.message
    };
  }

};

export default Menu;

const PageTitle = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.deep_red};
  text-align: center;
`;

const MenuList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const MenuItem = styled.li`
  list-style: none;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  background-color: ${({vegetarian, theme}) => (vegetarian ? theme.colors.neon_green : theme.colors.pale_pink)};
`;

const ProductTitle = styled.h3`
`;

const ProductContentItem = styled.span`
  padding: 0.3em;
  margin-right: 1em;
  border: 1px solid black;
  border-radius: 0.5em;
`;