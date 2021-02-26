import firebaseInstance from '../config/firebase'
import  { useEffect } from 'react'

function CreateUser() {

  useEffect(() => {
    const userCollection = firebaseInstance.firestore().collection('users');

    userCollection.doc().set({
      email: 'mate0@gmail.com',
      password: 'passordetmitt'
    })
    .then(() => {
      console.log('Lagt til');
    })
    .catch(error => {
      console.error(error);
    })
  }, [])

  return (
    <h1>New user</h1>
  );
};

export default CreateUser;