
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import firebaseInstance from '../config/firebase';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components'
import {useBasket} from '../config/basket_context'

import Navbar from '../components/Navbar'

const schema = object().shape({
  email: string().required('Dette feltet er påkrevd'),
  password: string().required('Dette feltet er påkrevd')
});

const Login = () => {

  const router = useRouter();
  const basket = useBasket();

  const [firebaseError, setFirebaseError] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {

    console.log('Form data', data);
    const { email, password } = data;

    try {
      await firebaseInstance.auth().signInWithEmailAndPassword(email, password);
      (basket.productLines.length > 0)
        ? router.push('/cart')
        : router.push('/menu')
        ;
    } catch(error) {
        setFirebaseError(error.message)
        console.log('En feil har oppstått')
    };
  };

  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <StyledInput 
              type='email' 
              name='email' 
              placeholder='Email'
              required
              ref={register}
            />
           
            <StyledInput 
              type='password' 
              name='password' 
              placeholder='Passord'
              required
              ref={register}
            />
            
          {firebaseError && <p>{firebaseError}</p>}
          <button type='submit'>Logg inn</button>
          <Terms>
            Ved å bestille aksepterer du vår <br />
            <span>personvernerklæring</span>.
          </Terms>
        </Form>
        <h4>
          Har du ikke en bruker?{' '}
          <Link href='/signup'>
            <span>Registrer deg</span>
          </Link>
        </h4>
      </Container>
    </>
  );
};

const StyledInput = styled.input`
  width: 75%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.text_light};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 1rem;
  padding: 0 1rem;
  transition: all 0.2s ease-in;

  &:hover {
    box-shadow: 0px 17px 16px -11px ${({theme}) => theme.colors.text_dark};
    transform: translateY(-5px);
  }
`;

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text_dark};

  span {
    text-decoration: underline;
  }

`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h3 {
    color: #666666;
    margin-bottom: 2rem;
  }

  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    margin: 1rem 0;
    font-size: 0.9rem;
    border: none;
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
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.light_green};
  color: ${({ theme }) => theme.colors.text_dark};

  h4 {
    color: ${({ theme }) => theme.colors.text_dark};
    font-size: 0.9rem;
    margin-top: 2rem;
    font-weight: 400;



    span {
      cursor: pointer;
      text-decoration: underline;
      font-weight: 900;
    }
  }
`;

export default Login;
