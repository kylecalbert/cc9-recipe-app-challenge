import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import GoogleButton from 'react-google-button';
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
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

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '70px',
        }}
      >
        {user?.displayName ? (
          <Button onClick={handleGoogleSignOut}>LogOut</Button>
        ) : (
          <Link to="/sign-in">Sign In</Link>
        )}
      </Box>

      <GoogleButton onClick={handleGoogleSignIn} />
    </Box>
  );
}

export default Login;
