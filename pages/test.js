import React, {useEffect, useState} from 'react'

const Test = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Rendres ikke på server', window)
    setUser('Bruker1')
  
  }, [])
  

  return (
    <>
      <h1>Hello {user && user}</h1>
    </>
  );
};

export default Test;

/*
  Server har ikke window
  useEffect gjør at koden kjøres i nettleser heller enn på server

  React = getInitialProps
  Next = getServerSideProps
*/