import React, {useEffect} from 'react'
import firebaseInstance from '../config/firebase'
import { useRouter } from 'next/router'
import { useAuth } from '../config/auth'

import Navbar from '../components/Navbar'


const Profile = () => {

  const router = useRouter();
  const userContext = useAuth();

  useEffect(() => {
    console.log('The context', userContext);
  }, [userContext]);


  const handleSignout = async () => {
    await firebaseInstance.auth().signOut();
    router.push('/');
  };

  if(!userContext) {
    return <p>Du er ikke logget inn</p>
  }

  return (
    <div>
      <Navbar />
      <p>Profile</p>
      <button onClick={handleSignout}>Logg ut</button>
      {userContext && (
        <>
          <p>{userContext.email}</p>
          <p>{userContext.uid}</p>
        </>
      )}
    </div>
  );
};

export default Profile;