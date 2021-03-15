function OrderPage({ id }) {
  return (
    <h1>Du er på side med id {id}</h1>
  )
}

// query inneholder info : url, historikk, annen info
OrderPage.getInitialProps = async ({ query }) => {
  return {
    id: query.id
  };
};

export default OrderPage;