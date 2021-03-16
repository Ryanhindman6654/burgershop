import firebaseInstance from '../../config/firebase'
import styled from 'styled-components'

export default function Reciept({ order, pageId, error }) {

  if (error !== undefined) {
    return (
      <p>En feil har oppstått: {error}</p>
    )
  }

  return (
    <Container>
      <Title>Din bestilling</Title>
      <OrderItem>
      <p>{order.id}</p>
        <OrderTitle><span>Hentenummer</span><br />{order.ordernumber}</OrderTitle>
        
        <p>{Date(order.time)}</p>
          <ul>
            {order.order.map(item => {
              return(
                <li key={item.title}>
                  <p>{item.title}</p> <p>{item.price}</p>
                </li>
              )
            })}
            <li className='total'><p>Total</p> <p>{order.total}</p></li>
          </ul>
        <div>
          
          {
            (order.delivered === true) 
            ? 'Ordren er levert.' 
            : (order.packaged === true)
            ? 'Ordren er klar for henting'
            : 'Ordren er på vei'
          }
        </div>
      </OrderItem>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.light_green};
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
      width: 100%;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0.5rem;
      border-bottom: solid 1px ${({packaged, theme}) => (packaged ? theme.colors.text_light : theme.colors.dark)};
    
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
`

Reciept.getInitialProps = async ({ query }) => {

  

  try {
    const pageId = query.id;
    const collection = await firebaseInstance.firestore().collection('orders');
    const document = await collection.doc(pageId).get();

    if (document.exists !== true) {
      throw new Error('Ordren finnes ikke.')
    };

    const order = {
      id: document.id,
      ...document.data()
    };

    return { order, pageId };

  } catch (error) {
    return {
      error: error.message
    }
  };

};

// function OrderPage({ id }) {
//   return (
//     <h1>Du er på side med id {id}</h1>
//   )
// }

// // query inneholder info : url, historikk, annen info
// OrderPage.getInitialProps = async ({ query }) => {
//   return {
//     id: query.id
//   };
// };

// export default OrderPage;