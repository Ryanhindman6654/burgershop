import firebaseInstance from '../config/firebase'
import styled from 'styled-components'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {useBasket} from '../config/basket_context'
import { useAuth } from '../config/auth'
import { useRouter } from 'next/router'

import Navbar from '../components/Navbar'

function Menu({ productsArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

  const router = useRouter();
  const basket = useBasket();
  const userContext = useAuth();

    const handleOrderClick = async () => {
      const counterRef = firebaseInstance
        .firestore()
        .collection("globals")
        .doc("counter");
      const orderCollection = firebaseInstance.firestore().collection("orders");
      const orderRef = await orderCollection.add({
        user: userContext.email,
        userid: userContext.uid,
        ordernumber: 1234,
        order: basket.productLines.map(item => {
          return ({
            title: item.title,
            price: item.price,
            amount: 8
          })
        }),
        packaged: false,
        delivered: false,
        total: basket.total,
        time: Date.now(),
      });
  
      console.log("Order", orderRef.id);
  
      await firebaseInstance.firestore().runTransaction((transaction) => {
        return transaction.get(counterRef).then((doc) => {
          const count = doc.data().count;
          let newCount = count + 1;
          if (newCount > 60) {
            newCount = 1;
          }
          transaction.update(counterRef, { count: newCount });
          transaction.update(orderRef, { ordernumber: newCount });
        });
      });
  
      router.push(`/orders/${orderRef.id}`);
    };

  return (
    <>
      
      <Head>
        <title>Handlekurv</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <Container>
        <PageTitle>Handlekurv</PageTitle>
        <Link href='menu'>
          <NavLink>Tilbake til meny</NavLink>
        </Link>
        <MenuList>
          {basket.productLines.map(item => {
            return (
              <MenuItem key={item.id}>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductTitle>{item.price},-</ProductTitle>
                <InlineButton onClick={() => {
                  const newProduct = productsArray.find(product => product.id === item.id)
                  basket.addProductLine(newProduct)
                }}>
                  +
                </InlineButton>
                <ProductTitle>1</ProductTitle>
                <InlineButton onClick={(e, i) => {
                  basket.removeProductLine(e, i)
                }}>
                  -
                </InlineButton>
              </MenuItem>
            )
          })}
        </MenuList>
        <ProductTitle>Total: {basket.total}</ProductTitle>
        {userContext && <Button onClick={() => handleOrderClick()}>Send inn bestilling</Button>}
        {!userContext && <ProductTitle>Logg inn for å bestille</ProductTitle>}
        {!userContext && <Button><Link href='/login'>Logg inn</Link></Button>}
      </Container>
      

    </>
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

const NavLink = styled.button`
  background: none;
  font-weight: 900;
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors.text_dark};
  border: 2px solid ${({theme}) => theme.colors.text_dark};
  padding: 0.9rem 1.1rem;
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {

    transform: translateX(-10px);

  }
`;

const Container = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.light_green};
  color: ${({ theme }) => theme.colors.text_dark};
`;

const InlineButton = styled.button`
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  color: ${({theme}) => theme.colors.text_dark};
  border: solid 1.5px ${({theme}) => theme.colors.text_dark};
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  margin: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.colors.text_dark};
    color: ${({theme}) => theme.colors.text_light};
  }
`;

const Button = styled.button`
  background: ${({theme}) => theme.colors.text_dark};
  border: none;
  padding: 0.9rem 1.1rem;
  color: ${({theme}) => theme.colors.text_light};
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  margin: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
   box-shadow: 0px 17px 16px -11px ${({theme}) => theme.colors.text_dark};
    transform: translateY(-5px);
  }
`;

const PageTitle = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.text_dark};
  text-align: center;
`;

const MenuList = styled.ul`
  min-width: 50%;
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0.5rem;
  border-bottom: solid 1.5px ${({theme}) => theme.colors.text_dark};
`;

const ProductTitle = styled.h3`
`;

const ProductContentItem = styled.span`
  padding: 0.3em;
  margin-right: 1em;
  border: 1px solid black;
  border-radius: 0.5em;
`;