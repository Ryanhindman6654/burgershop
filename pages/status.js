
import firebaseInstance from '../config/firebase'
import styled from 'styled-components'
import React, {useState, useEffect} from 'react'

function Status({ ordersArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

  console.log(ordersArray)

  const [incompleteOrders, setIncompleteOrders] = useState([])

  useEffect(() => {
    let ref = firebaseInstance
    .firestore()
    .collection('orders')
    .where('delivered', '==', false)
    ref.onSnapshot((snapshot) => {
      let data = []
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setIncompleteOrders(data)
    })   
  }, []);

  return (
    <Container>
      <div>
        <Title>Ready</Title>
        <OrderList>
          {incompleteOrders.map(item => {
            if (item.packaged) {
            return (
              <OrderItem key={item.id}>
                <ReadyTitle>{item.ordernumber}</ReadyTitle>
              </OrderItem>
            )}
          })}
        </OrderList>
      </div>
      <div>
        <Title>Making</Title>
        <OrderList>
          {incompleteOrders.map(item => {
            if (!item.packaged) {
            return (
              <OrderItem key={item.id}>
                <MakingTitle>{item.ordernumber}</MakingTitle>
              </OrderItem>
            )}
          })}
        </OrderList>
      </div>
    </Container>
  );
};

export default Status;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.light_green};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text_dark};
  text-align: center;
`
const OrderList = styled.ul`
  font-size: 50px;
  display: flex;
  flex-wrap: wrap;
`
const OrderItem = styled.li`
  list-style: none;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  background-color: ${({theme}) => theme.colors.text_dark};
`
const MakingTitle = styled.h2`
  color: ${({theme}) => theme.colors.text_light};
  font-size: 75px;
`
const ReadyTitle = styled.h2`
  color: ${({theme}) => theme.colors.text_light};
  font-size: 150px;
`