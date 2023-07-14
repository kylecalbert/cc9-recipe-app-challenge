import React from 'react';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthentication } from './AuthUtils';
import { Logout } from '@mui/icons-material';
jest.mock('./AuthUtils', () => ({
  useAuthentication: () => ({
    user: {
      email: null,
      displayName: null,
      uid: null,
    },
    handleGoogleSignIn: jest.fn(),
    handleGoogleSignOut: jest.fn(),
  }),
}));

describe('Navbar', () => {
  test('renders the home button link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole('link', { name: /Home/i });
    expect(homeButton).toBeInTheDocument();
  });

  test('renders the app title', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(/The Recipe App/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the favoritee button link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const favoriteButton = screen.getByRole('link', { name: /Favorites/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  test('renders the Sign In button when user is not logged in', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const signInButton = screen.getByRole('link', { name: /Sign In/i });
    expect(signInButton).toBeInTheDocument();
  });

  test('calls handleGoogleSignIn when Sign In button is clicked', () => {
    const handleGoogleSignInMock = jest.fn();
    jest.mock('./AuthUtils', () => ({
      useAuthentication: () => ({
        user: null,
        handleGoogleSignIn: handleGoogleSignInMock,
        handleGoogleSignOut: jest.fn(),
      }),
    }));

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const signInButton = screen.getByRole('link', { name: /Sign In/i });
    fireEvent.click(signInButton);
    expect(handleGoogleSignInMock).toHaveBeenCalled();
  });
});
