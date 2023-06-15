import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useAuthentication() {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const { googleSignIn, user, logOut } = authContext;

///if a user object is returned, instantly navigate to the home page
  useEffect(() => {
    if (user) {
      navigate('/Home');
    }
  }, [user]);

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
