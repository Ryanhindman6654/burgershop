import firebaseInstance from '../config/firebase'
import styled from 'styled-components'
import React, {useState, useEffect} from 'react'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`
const OrderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`
const OrderItem = styled.li`
  list-style: none;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  background-color: ${({packaged}) => (packaged ? 'lightgrey' : 'darkgrey')};
`
const OrderTitle = styled.h3`
`
const StatusButton = styled.button`
`

function Orders({ ordersArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

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

  console.log(ordersArray)

  function handlePackagedClick(orderId, isOrderPackaged) {
    const orderCollection = firebaseInstance.firestore().collection('orders');
    orderCollection.doc(orderId).update({
      packaged: !isOrderPackaged,
    })
      .then(() => {
        console.log('Packaged');
      })
      .catch(error => {
        console.error(error);
      })
  };

  // lag en funksjon som dekker begge

  function handleDeliveredClick(orderId, isOrderDelivered) {
    const orderCollection = firebaseInstance.firestore().collection('orders');
    orderCollection.doc(orderId).update({
      delivered: !isOrderDelivered,
    })
      .then(() => {
        console.log('Delivered');
      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <main>
      <Title>Orders</Title>
      <OrderList>
        {incompleteOrders.map(item => {
          return (
            <OrderItem packaged={item.packaged} key={item.id}>
              <OrderTitle>{item.ordernumber}</OrderTitle>
              <ul>
                {item.order.map(item => {
                  return <li key={item.title}>{item.title}</li>
                })}
              </ul>
              {item.packaged && <p>Ready</p>}
              {!item.packaged && 
              <StatusButton onClick={() => handlePackagedClick(item.id, item.packaged)}>
                Packaged
              </StatusButton>}
              {item.packaged && 
              <StatusButton onClick={() => handleDeliveredClick(item.id, item.delivered)}>
                Delivered
              </StatusButton>}
            </OrderItem>
          )
        })}
      </OrderList>
    </main>
  );
};

Orders.getInitialProps = async () => {

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

export default Orders;