import React from 'react'
import firebaseInstance from '../config/firebase'
import { useRouter } from 'next/router'
import {useAuth} from '../config/auth'

const Profile = () => {

  const router = useRouter();
  const userContext = useAuth();

  console.log(userContext);

  const handleSignout = async () => {
    await firebaseInstance.auth().signOut();
    router.push('/');
  };

  return (
    <div>
      <p>Profile</p>
      <button onClick={handleSignout}>Logg ut</button>
    </div>
  );
};

export default Profile;