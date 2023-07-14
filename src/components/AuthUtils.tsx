import { useAuthContext } from '../context/AuthContext';

///created this function so that handleGoogleSign and HandlegoogleSignOut dont have to be wirtten muliple times
//ie we have handlegoogle sign out/sign in on navbar and login page, so by adding the funcitons here and extracting,saving some lines of code
export function useAuthentication() {
  const authContext = useAuthContext();
  const { googleSignIn, user, logOut } = authContext;

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return { user, handleGoogleSignIn, handleGoogleSignOut };
}
export default useAuthentication;
