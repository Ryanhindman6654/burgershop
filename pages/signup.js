import React, {useState} from 'react'
import Link from 'next/link'
import firebaseInstance from '../config/firebase';
import { useRouter } from 'next/router'

import Navbar from '../components/Navbar'



const Signup = () => {

  const router = useRouter();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await firebaseInstance.auth().createUserWithEmailAndPassword(email, password);
      const uid = user.user.uid;

      const userCollection = await firebaseInstance.firestore().collection('users')
        .doc(uid).set({
          email: email,
          password: password,
          name: name,
        });

      console.log('Du har lagt til en bruker');
      router.push('/profile');
    } catch(error) {
        setError(error.message)
        console.log('En feil har oppstått')
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input 
          type='email' 
          name='email' 
          placeholder='Email' 
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type='password'
          name='password'
          placeholder='Passord'
          onChange={e => setPassword(e.target.value)}
        />
        <input 
          type='text'
          name='fullName'
          placeholder='Navn'
          onChange={e => setName(e.target.value)}
        />
        <button type='submit'>Registrer deg</button>
        {error && <p>{error}</p>}
      </form>
      <Link href='/login'>Har du allerede en bruker? Logg inn</Link>
    </div>
  )
}

export default Signup;