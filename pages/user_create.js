import firebaseInstance from '../config/firebase'
import  { useState, useEffect } from 'react'
import InputBlock from '../components/InputBlock'

function CreateUser() {

  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);

  function handleUserEmailChange(event) {
    setUserEmail(event.target.value);
  }

  function handleUserPasswordChange(event) {
    setUserPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userEmail, userPassword)

    const userCollection = firebaseInstance.firestore().collection('users');
    userCollection.doc().set({
      email: userEmail,
      password: userPassword
    })
      .then(() => {
        console.log('Lagt til');
        // state, en melding dukker opp om at det er lagt til
        // brukeren blir sendt videre? =>
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <main>
      <h1>New user</h1>
      <form
        name='add-user'
        id='add-user'
        action='/'
        methon='GET'
        onSubmit={event => handleSubmit(event)}
      >
        <InputBlock
          inputName='email'
          inputId='email'
          inputType='email'
          inputPlaceholder='Din epost'
          labelText='E-post'
          inputChangeHandler={event => handleUserEmailChange(event)}
        />
        <InputBlock
          inputName='password'
          inputId='password'
          inputType='password'
          inputPlaceholder='Ditt passord'
          labelText='Passord'
          inputChangeHandler={event => handleUserPasswordChange(event)}
        />
        <button type='submit'>Registrer</button>
      </form>
    </main>
  );
};

export default CreateUser;