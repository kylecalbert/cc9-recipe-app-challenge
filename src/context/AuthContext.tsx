import { createContext, useContext,ReactNode } from "react";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


interface AuthContextProviderProps {
    children: ReactNode;
  }

  interface AuthContextType{
    googleSignIn: ()=>void
  }
const AuthContext = createContext<AuthContextType | null>(null)


export const AuthContextProvider = ({ children }:AuthContextProviderProps) => {
 
    const googleSignIn=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }
    return (<AuthContext.Provider value={{googleSignIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
