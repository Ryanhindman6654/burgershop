import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../config/auth'
import Link from 'next/link'

import styled from 'styled-components'

const Navbar = () => {

  const router = useRouter();
  const userContext = useAuth();

  useEffect(() => {
    console.log('The context', userContext);
  }, [userContext]);



  return (
    <Nav>
      <NavbarContainer>
        <NavLogo href="/">Burgere</NavLogo>
        <NavMenu>
          <NavItem>
            <NavLink href="/menu">Meny</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Log inn</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/menu">Kurv</NavLink>
          </NavItem>
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background: #000;
  /* height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  } */
`

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;

  &:visited {
    color: #fff;
  }
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavItem = styled.li`
  height: 80px;
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`