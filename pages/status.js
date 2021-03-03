
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
  background-color: lightgrey;
`
const OrderTitle = styled.h2`
  font-size: 150px;
`


function Status({ ordersArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

  console.log(ordersArray)

  return (
    <main>
      <Title>Ready</Title>
      <OrderList>
        {ordersArray.map(item => {
          return (
            <OrderItem key={item.id}>
              <OrderTitle>{item.ordernumber}</OrderTitle>
            </OrderItem>
          )
        })}
      </OrderList>
    </main>
  );
};

Status.getInitialProps = async () => {

  try {
    const ordersCollection = await firebaseInstance.firestore().collection('orders');
    const ordersData = await ordersCollection.where('delivered', '==', false).get();
    // filter only non-delivered
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

export default Status;