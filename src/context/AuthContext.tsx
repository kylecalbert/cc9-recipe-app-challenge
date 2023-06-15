import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

interface AppUser {
  email: string | null;
  displayName: string | null;
  uid: string | null;
}

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
      setUser(currentUser);
    });
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

// Custom hook to access the AuthContext
export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
