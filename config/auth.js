import { 
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import firebaseInstance from './firebase'
import nookies from 'nookies'

const AuthContext = createContext({user: null});

export function AuthProvider({children}) {

  const [user, setUser] = useState();

  useEffect(() => {
    return firebaseInstance.auth().onIdTokenChanged( async (user) => {
      if(!user) {
        setUser(null);
        nookies.set(undefined, 'token', null, { path: '/' });
      } else {
        const token = user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  });


  // Sjekk hvert 10. minutt om en bruker er logget inn

  useEffect(() => {
    const handle = setInterval( async () => {
      const user = firebaseInstance.auth().currentUser
      if(user) await user.getIdToken(true)
    }, 10 * 60 * 1000);

    return clearInterval(handle);

  });

  // AuthContext => en wrapper vi trenger for å gi andre komponenter tilgang på contexten

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;

};

export const useAuth = () => {
  return useContext(AuthContext)
}
