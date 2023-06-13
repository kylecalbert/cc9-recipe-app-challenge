import { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useAuthentication() {
  const navigate = useNavigate();
  const authContext = UserAuth();
  const { googleSignIn, user, logOut } = authContext;

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
