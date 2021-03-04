
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebaseInstance from '../config/firebase';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components'

const schema = object().shape({
  email: string().required('Dette feltet er påkrevd'),
  password: string().required('Dette feltet er påkrevd')
});

const Login = () => {

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
      console.log('Du har blitt logget inn');
    } catch(error) {
        setFirebaseError(error.message)
        console.log('En feil har oppstått')
    };
 };

  // useEffect(() => {
  //   console.log('errors', errors);
  // }, [errors]);

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <StyledInput 
              type='email' 
              name='email' 
              placeholder='Email'
              required
              ref={register}
            />
            <Status />
          </InputContainer>
          <InputContainer>
            <StyledInput 
              type='password' 
              name='password' 
              placeholder='Passord'
              required
              ref={register}
            />
            <Status />
          </InputContainer>
          {firebaseError && <p>{firebaseError}</p>}
          <button type='submit'>Logg inn</button>
          <Terms>
            By signing in, I agree to the Privacy Policy <br />
            and Terms of Service
          </Terms>
        </Form>
        <h4>
          Har du ikke en bruker?{' '}
          <Link href='/signup'>
            <span>Registrer deg</span>
          </Link>
        </h4>
      </Container>
    </div>
  );
};

const StyledInput = styled.input`
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.div`
  height: 10px;
  width: 10px;
  background-color: #9d9d9d;
  border-radius: 50%;
  margin-left: 1rem;

  ${StyledInput}:focus + & {
    background-color: #FFA689;
  }
  ${StyledInput}:invalid + & {
    background-color: #FE2F75;
  }
  ${StyledInput}:valid + & {
    background-color: #70EDB9;
  }
`;

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;  
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
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70EDB9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const Container = styled.div`
  width: 100vw;
  position: absolute;
  padding: 0;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.6);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0.2rem;

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;

    span {
      color: #ff8d8d;
      cursor: pointer;

    }
  }
`;

export default Login;
