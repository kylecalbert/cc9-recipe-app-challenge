import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  googleSignIn: () => void;
  logOut: () => void;
  user: AppUser | null;
}

const AuthContext = createContext<AuthContextType>({
  googleSignIn: () => {},
  logOut: () => {},
  user: null,
});

interface AppUser {
  email: string | null;
  displayName: string | null;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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

export const UserAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
