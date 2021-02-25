import firebaseInstance from '../config/firebase'

function Menu({ productsArray, error }) {

  if (error !== undefined) {
    return (
      <p>En feil har oppstått: {error}</p>
    )
  }

  console.log(productsArray)

  return (
    <main>
      <h1>Meny</h1>
      <ul>
        {productsArray.map(item => {
          return (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.price},-</p>
              {item.vegetarian && <p>Vegetarian</p>}
              {item.contents && 
                <p>
                  {item.contents.map(item => {
                    return (
                      <span>{item} </span>
                    )
                  })}
                </p>
              }
            </li>
          )
        })}
      </ul>
    </main>
  );
};

Menu.getInitialProps = async () => {

  try {
    const productsCollection = await firebaseInstance.firestore().collection('products');
    const productsData = await productsCollection.get();

    let productsArray = [];
    productsData.forEach(product => {
      productsArray.push({
        id: product.id,
        ...product.data()
      });
    });

    return { productsArray }

  } catch (error) {
    return {
      error: error.message
    };
  }

};

export default Menu;