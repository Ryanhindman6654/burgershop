import React, {useState} from 'react'
import { useAuth } from '../../config/auth'
import { useBasket } from '../../config/basket_context'

import Link from 'next/link'

import styled from 'styled-components'

const Navbar = () => {

  const userContext = useAuth();
  const basket = useBasket();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <Logo href="/">Børres Burgere</Logo>
        <Hamburger onClick={()=>setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        <Menu isOpen={isOpen}>
          <LinkWrapper>
            {!userContext && <Link href="/login"><MenuLink>Log inn</MenuLink></Link>}
            {!userContext && <Link href="/signup"><MenuLink>Registrer bruker</MenuLink></Link>}
            {userContext && <Link href="/profile"><MenuLink>
              {userContext.displayName}
            </MenuLink></Link>}
            <Link href="menu"><MenuLink>Meny</MenuLink></Link>
            <Button>
              <Link href="/cart">
                Handlekurv
              </Link>
              {' '}
              <span>
                {(basket.productLines.length > 1) && basket.productLines.length}
                </span>
            </Button>
          </LinkWrapper>
        </Menu>
      </Container>
    </Nav>
  );
};


export default Navbar;

const Logo = styled(Link)`
  font-weight: 900;
  color: ${({theme}) => theme.colors.text_dark};
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    overflow: hidden;
    border-radius: 1rem;
    margin-top: 1rem;
    box-shadow: -4px 8px 15px 1 rgba(0,0,0,0.07);
    max-height: ${({isOpen}) => isOpen ? '300px' : '0px'};
    width: 100%;
    transition: max-height 0.3s ease-in-out;

    background: rgba(255, 255, 255, 0.9);
      @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        --webkit-backdrop-filter: blur(15px);
        backdrop-filter: blur(15px);
        background: rgba(255, 255, 255, 0.4);
      }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 1.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MenuLink = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  color: ${({theme}) => theme.colors.text_dark};
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  transition: all 0.2s ease-in-out;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.colors.text_light};
  }
`;

const Button = styled.button`

  font-size: 0.9rem;
  background-color: ${({theme}) => theme.colors.text_dark};
  border: none;
  padding: 0.8rem 1.1rem;
  color: ${({theme}) => theme.colors.text_light};
  border-radius: 1rem;
  box-shadow: 0px 12px 24px -7px ${({theme}) => theme.colors.text_dark};
  transition: all 0.2s ease-in-out;
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 17px 16px -11px ${({theme}) => theme.colors.text_dark};
    transform: translateY(-5px);
  }

  span {
    font-weight: 900;
  }

`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background-color: ${({theme}) => theme.colors.text_dark};
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;