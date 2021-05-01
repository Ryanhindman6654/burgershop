import React, { useEffect, useState } from "react";

import Head from "next/head";
import Navbar from "../components/Navbar";
import firebaseInstance from "../config/firebase";
import styled from "styled-components";
import { useAuth } from "../config/auth";
import { useRouter } from "next/router";

const Profile = () => {
  const userContext = useAuth();

  if (!userContext) {
    return <p>Du er ikke logget inn</p>;
  }

  const router = useRouter();

  const handleSignout = async () => {
    await firebaseInstance.auth().signOut();
    router.push("/");
  };

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    let ref = firebaseInstance
      .firestore()
      .collection("orders")
      .where("userid", "==", userContext.uid);
    ref.onSnapshot((snapshot) => {
      let data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserOrders(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Profil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Container>
        <PageTitle>Hei {userContext.displayName}</PageTitle>
        {userContext && (
          <InfoContainer>
            <OrderTitle>
              <span>Brukerinfo</span>
            </OrderTitle>
            <ul>
              <li>Navn: {userContext.displayName}</li>
              <li>Epost: {userContext.email}</li>
              <li>Burker-id: {userContext.uid}</li>
            </ul>
            <Button onClick={handleSignout}>Logg ut</Button>
          </InfoContainer>
        )}

        <OrderTitle>
          <span>Ordrehistorikk</span>
        </OrderTitle>
        <OrderList>
          {userOrders.map((item) => {
            if (!item.packaged) {
              return (
                <OrderItem key={item.id}>
                  <OrderTitle>
                    <span>
                      Bestilling
                      <br />
                      {item.id}
                    </span>
                  </OrderTitle>
                  <ul>
                    {item.order.map((item) => {
                      return (
                        <li key={item.title}>
                          <p>{item.title}</p> <p>{item.quantity}</p>{" "}
                          <p>{item.price}</p>
                        </li>
                      );
                    })}
                    <li className="total">
                      <p>Total</p> <p>{item.total}</p>
                    </li>
                  </ul>
                  <p>
                    {item.id}
                    <br />
                    {item.user}
                  </p>
                  <p>{new Date(item.time).toLocaleString()}</p>
                </OrderItem>
              );
            }
          })}
        </OrderList>
      </Container>
    </>
  );
};

export default Profile;

const InfoContainer = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 33%;
  max-width: 93%;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.text_light};

  span {
    font-weight: 900;
  }

  p {
    text-align: center;
  }

  ul {
    padding: 0;
    list-style-type: none;
    margin: 1rem;
    width: 100%;

    li {
      width: 100%;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0.5rem 0;
      border-bottom: solid 1px
        ${({ packaged, theme }) =>
          packaged ? theme.colors.text_light : theme.colors.dark};

      p {
        padding: 0;
        margin: 0;
      }
    }

    .total {
      /* padding-top: 1rem; */
      border: none;
      font-weight: 900;
    }
  }
`;

const OrderTitle = styled.h3`
  text-align: center;
  font-weight: 900;
  font-size: 2.5rem;

  span {
    font-weight: 400;
    font-size: 1.5rem;
  }
`;

const OrderItem = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 33%;
  max-width: 93%;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  color: ${({ theme }) => theme.colors.text_light};
  background-color: ${({ theme }) => theme.colors.text_dark};

  p {
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 1rem;
    width: 100%;

    li {
      list-style-type: none;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0.5rem 0;
      border-bottom: solid 1px
        ${({ packaged, theme }) =>
          packaged ? theme.colors.text_light : theme.colors.dark};

      p {
        padding: 0;
        margin: 0;
      }
    }

    .total {
      border: none;
      font-weight: 900;
    }
  }
`;

const OrderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.text_dark};
  border: none;
  padding: 0.9rem 1.1rem;
  color: ${({ theme }) => theme.colors.text_light};
  border-radius: 1rem;
  box-shadow: 0px 12px 24px -7px ${({ theme }) => theme.colors.text_dark};
  transition: all 0.3s ease-in-out;
  margin: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 17px 16px -11px ${({ theme }) => theme.colors.text_dark};
    transform: translateY(-5px);
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

const PageTitle = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.text_dark};
  text-align: center;
`;
