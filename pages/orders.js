import firebaseInstance from '../config/firebase'
import styled from 'styled-components'

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

  console.log(ordersArray)

  function handleClick(orderId) {

    const orderCollection = firebaseInstance.firestore().collection('orders');
    orderCollection.doc(orderId).update({
      packaged: true,
    })
      .then(() => {
        console.log('Packaged');
        console.log(orderCollection)
      })
      .catch(error => {
        console.error(error);
      })

  }

  return (
    <main>
      <Title>Orders</Title>
      <OrderList>
        {ordersArray.map(item => {
          return (
            <OrderItem packaged={item.packaged} key={item.id}>
              <OrderTitle>{item.ordernumber}</OrderTitle>
              <ul>
                {item.order.map(item => {
                  return <li key={item.title}>{item.title}</li>
                })}
              </ul>
              {item.packaged && <p>Ready</p>}
              {item.delivered && <p>Delivered</p>}
              <StatusButton onClick={() => handleClick(item.id)}>Ready</StatusButton>
              <StatusButton>Delivered</StatusButton>
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