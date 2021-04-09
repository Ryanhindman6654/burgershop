import firebaseInstance from "../../config/firebase";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

export default function Reciept({ pageId, error }) {
  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>;
  }

  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    let ref = firebaseInstance.firestore().collection("orders").doc(pageId);

    ref.onSnapshot((docSnapshot) => {
      let orderData = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
      setMyOrder(orderData);
      console.log(orderData);
    });
  }, []);

  const timeStamp = new Date(myOrder.time).toLocaleString();

  return (
    <>
      <Container>
        <Title>Din bestilling</Title>
        <OrderItem>
          <OrderTitle>
            <span>Hentenummer</span>
            <br />
            {myOrder.ordernumber}
          </OrderTitle>

          <StatusBar packaged={myOrder.packaged}>
            {myOrder.delivered === true
              ? "Ordren er levert."
              : myOrder.packaged === true
              ? "Ordren er klar for henting"
              : "Ordren er på vei"}
          </StatusBar>
          <ul>
            {myOrder?.order?.map((item) => {
              return (
                <li key={item.title}>
                  <p>{item.title}</p> <p>{item.price}</p>
                </li>
              );
            })}
            <li className="total">
              <p>Total</p> <p>{myOrder.total}</p>
            </li>
          </ul>
          <p>
            {myOrder.id}
            <br />
            {myOrder.user}
          </p>
          <p>{timeStamp}</p>
        </OrderItem>
      </Container>
    </>
  );
}
const StatusBar = styled.p`
  background: ${({ packaged, theme }) =>
    packaged ? theme.colors.neon_green : theme.colors.text_dark};
  color: ${({ packaged, theme }) =>
    packaged ? theme.colors.text_dark : theme.colors.text_light};
  border: none;
  padding: 0.9rem 1.1rem;
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  margin: 0.5rem;
  justify-self: flex-end;
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.light_green};
  color: ${({ theme }) => theme.colors.text_dark};
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
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

const OrderItem = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 30%;
  max-width: 95%;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  color: ${({ packaged, theme }) =>
    packaged ? theme.colors.text_light : theme.colors.dark};
  background-color: ${({ packaged, theme }) =>
    packaged ? theme.colors.text_dark : theme.colors.text_light};

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
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0.5rem;
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

Reciept.getInitialProps = async ({ query }) => {
  try {
    const pageId = query.id;

    return { pageId };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
