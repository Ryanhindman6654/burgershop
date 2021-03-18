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

  const drinkMenu = productsArray.filter(item => item.category === 'bu')
  console.log('Drinkmenu', drinkMenu)

  return (
    <>
      <Head>
        <title>Meny</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Container>
        <PageTitle>Meny</PageTitle>
        <Link href='cart'><NavLink>Til bestilling</NavLink></Link>
        <MenuList>
          <SubTitle>Drikke</SubTitle>
          {productsArray.map(item => {
            return (
              <MenuItem vegetarian={item.vegetarian} key={item.id}>
                <ProductTitle>{item.title}</ProductTitle>
                {item.vegetarian && <ProductContentVeg>veggie</ProductContentVeg>}
                {item.contents && 
                  <>
                    {item.contents.map(item => {
                      return <ProductContentItem key={item}>{item}</ProductContentItem>
                    })}
                  </>
                }
                <p>{item.price},-</p>
                <Button onClick={() => {
                  const newProduct = productsArray.find(product => product.id === item.id)
                  basket.addProductLine(newProduct)
                  }}>
                  Legg til
                </Button>
              </MenuItem>
            )
          })}
        </MenuList>
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

const SubTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
`;

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

    transform: translateX(10px);

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
  border-bottom: solid 2px ${({theme}) => theme.colors.text_dark};
`;

const ProductTitle = styled.h3`
`;

const ProductContentVeg = styled.span`
  background: ${({ theme }) => theme.colors.text_light};
  color: ${({ theme }) => theme.colors.text_dark};
  padding: 0.3em;
  margin-right: 0.3em;
  border-radius: 0.5em;


`;

const ProductContentItem = styled.span`
  border: 1.5px solid ${({ theme }) => theme.colors.text_dark};
  padding: 0.3em;
  margin-right: 0.3em;
  border-radius: 0.5em;
`;