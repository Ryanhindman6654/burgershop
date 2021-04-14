import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import firebaseInstance from "../config/firebase";
import { useBasket } from "../config/basket_context";
import Navbar from "../components/Navbar";

function Menu({ productsArray, error }) {
  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>;
  }

  const basket = useBasket();

  const fullMenu = [
    {
      category: "Burgers",
      products: productsArray.filter(
        (product) => product.category === "burgers"
      ),
    },
    {
      category: "Fries",
      products: productsArray.filter((product) => product.category === "fries"),
    },
    {
      category: "Dips",
      products: productsArray.filter((product) => product.category === "dips"),
    },
    {
      category: "Extras",
      products: productsArray.filter(
        (product) => product.category === "extras"
      ),
    },
    {
      category: "Drinks",
      products: productsArray.filter(
        (product) => product.category === "drinks"
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Meny</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Container>
        <PageTitle>Meny</PageTitle>
        <Link href="cart">
          <NavLink>Til bestilling</NavLink>
        </Link>
        <MenuList>
          {fullMenu.map((category) => {
            return (
              <>
                <SubTitle>{category.category}</SubTitle>
                {category.products.map((product) => {
                  return (
                    <MenuItem vegetarian={product.vegetarian} key={product.id}>
                      <ProductTitle>{product.title}</ProductTitle>
                      {product.contents && (
                        <>
                          {product.contents.map((product) => {
                            return (
                              <ProductContentItem key={[product]}>
                                {product}
                              </ProductContentItem>
                            );
                          })}
                        </>
                      )}
                      <ProductPrice>{product.price},-</ProductPrice>
                      <Button
                        onClick={() => {
                          const newProduct = productsArray.find(
                            (item) => item.id === product.id
                          );

                          basket.addProductLine(newProduct);
                        }}
                      >
                        Add
                      </Button>
                    </MenuItem>
                  );
                })}
              </>
            );
          })}
        </MenuList>
      </Container>
    </>
  );
}

Menu.getInitialProps = async () => {
  try {
    const productsCollection = await firebaseInstance
      .firestore()
      .collection("products");
    const productsData = await productsCollection.get();

    let productsArray = [];
    productsData.forEach((product) => {
      productsArray.push({
        id: product.id,
        ...product.data(),
      });
    });

    return { productsArray };
  } catch (error) {
    return {
      error: error.message,
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
  color: ${({ theme }) => theme.colors.text_dark};
  border: 2px solid ${({ theme }) => theme.colors.text_dark};
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
  background: ${({ theme }) => theme.colors.light_green};
  color: ${({ theme }) => theme.colors.text_dark};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.text_dark};
  border: none;
  padding: 0.9rem 1.1rem;
  color: ${({ theme }) => theme.colors.text_light};
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  margin: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 17px 16px -11px ${({ theme }) => theme.colors.text_dark};
    transform: translateY(-5px);
  }
`;

const PageTitle = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.text_dark};
  text-align: center;
`;

const MenuList = styled.ul`
  width: 90%;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style-type: none;
  flex-wrap: wrap;
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0.1rem 0;

  border-bottom: solid 2px ${({ theme }) => theme.colors.text_dark};
`;

const ProductTitle = styled.h3`
  justify-self: flex-start;
  flex-grow: 2;
`;
const ProductPrice = styled.p`
  justify-self: flex-end;
`;

const ProductContentItem = styled.span`
  border: 1.5px solid ${({ theme }) => theme.colors.text_dark};
  padding: 0.3em;
  margin-right: 0.3em;
  border-radius: 0.5em;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
