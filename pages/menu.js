import firebaseInstance from '../config/firebase'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`
const MenuList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`
const MenuItem = styled.li`
  list-style: none;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5em;
  background-color: ${({vegetarian}) => (vegetarian ? 'green' : 'red')};
`
const ProductTitle = styled.h3`
`
const ProductContentItem = styled.span`
  padding: 0.3em;
  margin-right: 1em;
  border: 1px solid black;
  border-radius: 0.5em;
`

function Menu({ productsArray, error }) {

  if (error !== undefined) {
    return <p>En feil har oppstått: {error}</p>
  }

  console.log(productsArray)

  return (
    <main>
      <Title>Meny</Title>
      <MenuList>
        {productsArray.map(item => {
          return (
            <MenuItem vegetarian={item.vegetarian} key={item.id}>
              <ProductTitle>{item.title}</ProductTitle>
              {item.vegetarian && <p>Vegetarian</p>}
              {item.contents && 
                <p>
                  {item.contents.map(item => {
                    return <ProductContentItem key={item}>{item}</ProductContentItem>
                  })}
                </p>
              }
              <p>{item.price},-</p>
            </MenuItem>
          )
        })}
      </MenuList>
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