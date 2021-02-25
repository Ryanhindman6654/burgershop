import firebaseInstance from '../config/firebase'

export default function Reciept({ order, error }) {

  if (error !== undefined) {
    return (
      <p>En feil har oppstått: {error}</p>
    )
  }

  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(order, null, 2)}
        </code>
      </pre> */}
      <h1>Ordre</h1>
      <h2>Din bestilling {order.ordernumber}</h2>
      <p>Dato</p>
      <div>
        <ul>
          {order.content.map(item => {
            return(
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        {
        (order.status.delivered === true) ?
          'Ordren er levert.' :
        (order.status.packaged === true) ?
          'Ordren er klar for henting' : 
          'Ordren er på vei'
        }
      </div>
    </>
  )
}

Reciept.getInitialProps = async () => {

  try {
    const collection = await firebaseInstance.firestore().collection('orders');
    const document = await collection.doc('FcRJvAv1lxunHCgvLD7S').get();

    if (document.exists !== true) {
      throw new Error('Ordren finnes ikke.')
    };

    const order = {
      id: document.id,
      ...document.data()
    };

    return { order };

  } catch (error) {
    return {
      error: error.message
    }
  };

};