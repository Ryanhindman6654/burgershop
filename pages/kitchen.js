import firebaseInstance from '../config/firebase'
import styled from 'styled-components'
import React, {useState, useEffect} from 'react'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.text_dark};
  text-align: center;
`
const OrderList = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const OrderItem = styled.li`
  list-style: none;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 33%;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  color: ${({packaged, theme}) => (packaged ? theme.colors.text_light : theme.colors.dark)};
  background-color: ${({packaged, theme}) => (packaged ? theme.colors.text_dark : theme.colors.text_light)};

  ul {
    padding: 0;
    list-style-type: none;
    margin: 1rem;
    width: 100%;

    li {
      margin: 0.5rem;
      border-bottom: solid 1px ${({packaged, theme}) => (packaged ? theme.colors.text_light : theme.colors.dark)};
    }
  }
`
const OrderTitle = styled.h3`
  font-weight: 900;
  font-size: 3.5rem;
`
const StatusButton = styled.button`
  background: ${({packaged, theme}) => (packaged ? theme.colors.text_light : theme.colors.text_dark)};
  color: ${({packaged, theme}) => (packaged ? theme.colors.text_dark : theme.colors.text_light)};
  border: none;
  padding: 0.9rem 1.1rem;
  border-radius: 1rem;
  box-shadow: 0px 12px 24px -7px ${({theme}) => theme.colors.text_dark};
  transition: all 0.3s ease-in-out;
  margin: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  justify-self: flex-end;

  &:hover {
    box-shadow: 0px 17px 16px -11px ${({theme}) => theme.colors.text_dark};
    transform: translateY(-5px);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.light_green};
`;


function Kitchen({ ordersArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

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
    <Container>
      <Title>Bestillinger</Title>
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
              {!item.packaged && 
              <StatusButton onClick={() => handlePackagedClick(item.id, item.packaged)}>
                Ready
              </StatusButton>}
              {item.packaged && 
              <StatusButton packaged={item.packaged} onClick={() => handleDeliveredClick(item.id, item.delivered)}>
                Deliver
              </StatusButton>}
            </OrderItem>
          )
        })}
      </OrderList>
    </Container>
  );
};

// trengs dette?

Kitchen.getInitialProps = async () => {

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

export default Kitchen;