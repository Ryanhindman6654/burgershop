
import firebaseInstance from '../config/firebase'
import styled from 'styled-components'
import React, {useState, useEffect} from 'react'

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
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
  background-color: lightgrey;
`
const MakingTitle = styled.h2`
  font-size: 75px;
`
const ReadyTitle = styled.h2`
  font-size: 150px;
`

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
        //selects all documents where isReady value is false
        .where('delivered', '==', false)
        //listener acts whenever documents with this value changes
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
    }, [])

  return (
    <main>
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

    </main>
  );
};

/*
Status.getInitialProps = async () => {

  try {
    const ordersCollection = await firebaseInstance.firestore().collection('orders');
    const ordersData = await ordersCollection.where('delivered', '==', false).get();

    let ordersArray = [];
    ordersData.forEach(order => {
      ordersArray.push({
        id: order.id,
        ...order.data()
      });
    });

    return { ordersArray }

  } catch (error) {
    return {
      error: error.message
    };
  }

};
*/

export default Status;