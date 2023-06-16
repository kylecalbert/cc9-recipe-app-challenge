import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthentication } from './AuthUtils';
function Navbar() {
  const { user, handleGoogleSignIn, handleGoogleSignOut } = useAuthentication();

  const buttonStyle = {
    marginRight: '16px',
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          The Recipe App
        </Typography>
        <Button color="inherit" component={Link} to="/home" sx={buttonStyle}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/favorites" sx={buttonStyle}>
          Favorites
        </Button>
        {user?.displayName ? (
          <Button color="inherit" component={Link} to="/" onClick={handleGoogleSignOut} sx={buttonStyle}>
            Log Out
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/" onClick={handleGoogleSignIn} sx={buttonStyle}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
