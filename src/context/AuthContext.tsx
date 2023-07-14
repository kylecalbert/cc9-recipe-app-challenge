import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

// Define the shape of the user object
interface AppUser {
  email: string | null;
  displayName: string | null;
  uid: string | null;
}

// Define the shape of the AuthContext
interface AuthContextType {
  googleSignIn: () => void;
  logOut: () => void;
  user: AppUser | null;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  googleSignIn: () => {},
  logOut: () => {},
  user: null,
});

// Define the props for AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);

  // Function to log out the user
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName, uid } = currentUser;
        setUser({ email, displayName, uid });
      } else {
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Function to sign in with Google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// export the useAuthContext which literally contains everything such as the googleSignIn, googleSign out etc...
///so that we can extract those and set up on click functionalityes
export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
