import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


interface Recipe {
  recipe: {
    label: string;
    calories: string;
    image: string;
    ingredients: string[];
    uri:string,
  }
}

interface AuthContextProviderProps {
  children: ReactNode;
}


///auth context will be expecting these props
interface AuthContextType {
  googleSignIn: () => void;
  logOut: () => void;
  user: AppUser | null;
  recipes: Recipe[]
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;

}


const AuthContext = createContext<AuthContextType>({
  googleSignIn: () => {},
  logOut: () => {},
  user: null,
  recipes:[],
  setRecipes:()=>{}
});

///this is used to define the values the usestate will expect to have 
///the reason this is needed is because it prevents less code errors and saves developers time
interface AppUser {
  email: string | null;
  displayName: string | null;
  uid: string | null;

  
}



//setting up sign in with google functionality
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<AppUser | null>(null);  ///expects data object with two string values...or null..

  const logOut = () => {
    signOut(auth);
  };


  //if user object is returned, update the current user...
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
      setUser(currentUser);   
      console.log(currentUser)    
    });
    return () => {
      unsubscribe();
    };
  }, []);

  ///setting up google sign in functionality
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);  ///when user clicks sign in a pop up will appear
  };

  ///once everything is set up, alll the values or funcitons that are needed will need to be passed into here
  ///we will need the google sign in to sign in the user, the log out to log user out, and the user 
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user,recipes,setRecipes }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
