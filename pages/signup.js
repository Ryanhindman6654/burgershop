import React, {useState} from 'react'
import Link from 'next/link'
import firebaseInstance from '../config/firebase';

const Signup = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await firebaseInstance.auth().createUserWithEmailAndPassword(email, password);
      console.log('Du har lagt til en bruker');
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
        <button type='submit'>Registrer deg</button>
        {error && <p>{error}</p>}
      </form>
      <Link href='/login'>Har du allerede en bruker? Logg inn</Link>
    </div>
  )
}

export default Signup;