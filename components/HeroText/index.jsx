import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useAuth } from '../../config/auth'

const HeroText = () => {

  const userContext = useAuth();

  return (
    <Container>
      <h1>Børres</h1>
      <h1>Smakfulle</h1>
      <h1>Kortreiste</h1>
      <h1>Burgere</h1>
      <h5>Laget med råvarer fra Oslo og Viken</h5>
      <ButtonContainer>
        <Link href='/menu'><button className='readmore'>Se meny</button></Link>
        {!userContext && <Link href='/login'><button>Logg inn</button></Link>}
        {userContext && <Link href='/profile'><button>{userContext.displayName}</button></Link>}
      </ButtonContainer>
    </Container>
  )
}

export default HeroText

const ButtonContainer = styled.div`
  margin-top: 2rem;
  
  button {
    background: ${({theme}) => theme.colors.text_dark};
    border: none;
    padding: 0.9rem 1.1rem;
    color: ${({theme}) => theme.colors.text_light};
    border-radius: 1rem;
    box-shadow: 0px 12px 24px -7px ${({theme}) => theme.colors.text_dark};
    transition: all 0.3s ease-in-out;
    margin: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 17px 16px -11px ${({theme}) => theme.colors.text_dark};
      transform: translateY(-5px);
    }
  }

  .readmore {
    color: ${({theme}) => theme.colors.text_dark};
    background: transparent;
    border: 1.5px solid ${({theme}) => theme.colors.text_dark};
  }
`;

const Container = styled.div`
  padding: 2rem;

  h5 {
    color: ${({theme}) => theme.colors.text_dark};
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    

    &:nth-of-type(1) {
      color: ${({theme}) => theme.colors.text_dark};
      font-weight: 700;
    }
    &:nth-of-type(2) {
      color: rgba(0,0,0,.7)
    }
    &:nth-of-type(3) {
      color: rgba(0,0,0,.6);
    }
    &:nth-of-type(4) {
      color: rgba(0,0,0,.5);
    }
  }
`;