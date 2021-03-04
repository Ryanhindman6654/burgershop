import React, {useState} from 'react'
import Link from 'next/link'
import firebaseInstance from '../config/firebase';

const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await firebaseInstance.auth().signInWithEmailAndPassword(email, password);
      console.log('Du har blitt logget inn');
    } catch(error) {
        setError(error.message)
        console.log('En feil har oppstått')
    }
  }

  return (
    <div>
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
        <button type='submit'>Logg inn</button>
        {error && <p>{error}</p>}
      </form>
      <Link href='/signup'>Har du ikke en bruker? Registrer deg</Link>
    </div>
  )
}

export default Login;