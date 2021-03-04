
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebaseInstance from '../config/firebase';

import { useForm } from 'react-hook-form';

import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = object().shape({
  email: string().required('Dette feltet er påkrevd'),
  password: string().required('Dette feltet er påkrevd')
});

const Login = () => {

  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  // methods

  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {

    console.log('Form data', data);
    const {email, password} = data;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type='email' 
          name='email' 
          placeholder='Email'
          ref={register}
        />
        <input 
          type='password'
          name='password'
          placeholder='Passord'
          ref={register}
        />
        <button type='submit'>Logg inn</button>
        {firebaseError && <p>{firebaseError}</p>}
      </form>
      <Link href='/signup'>
        Har du ikke en bruker? Registrer deg
      </Link>
    </div>
  );
};

export default Login;