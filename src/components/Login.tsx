// Login.js
import React from 'react';
import { Box, Button, Typography, } from '@mui/material';
import GoogleButton from 'react-google-button';
import { useAuthentication } from './AuthUtils';
function Login() {
  const { user, handleGoogleSignIn, handleGoogleSignOut } = useAuthentication();

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: 'column',
      padding: '20px',
      background: '#f5f5f5',
    }}
  >
      <Typography variant="h5" component="h1" sx={{ marginBottom: '40px' }}>
        Welcome to our Recipe App
      </Typography>

      {user?.displayName ? (        //if the user exists ie if user is signed in, then render log out button
        <Button variant="contained" onClick={handleGoogleSignOut}> 
          Log Out
        </Button>
      ) : (  ///else if there is no user,  the sign in with google button
        <GoogleButton onClick={handleGoogleSignIn} />
      )}


    </Box>
  );
}

export default Login;
