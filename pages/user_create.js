import firebaseInstance from '../config/firebase'
import  { useState } from 'react'
import InputBlock from '../components/InputBlock'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 2em;
`

const LoginForm = styled.form`
  padding: 1em;
  width: 500px;
  background-color: ${({ theme }) => theme.colors.light_green};
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  gap: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1em;
`

const LoginButton = styled.button`
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 1em;
  border: ${({ theme }) => `1px solid ${theme.colors.neon_green}`};
  padding: 0.5em;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neon_green};
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
    color: black;
  }
`

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
        // brukeren blir sendt videre? —>
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <Container>
      <h1>New user</h1>
      <LoginForm
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
        <LoginButton type='submit'>Registrer</LoginButton>
      </LoginForm>
    </Container>
  );
};

export default CreateUser;