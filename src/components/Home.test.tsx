import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';
import { RecipeContextProvider } from '../context/RecipeContext';

describe('Home', () => {
  test('should update search value and trigger search', () => {
    // Render the Home component wrapped in RecipeContextProvider
    render(
      <RecipeContextProvider>
        <Home />
      </RecipeContextProvider>
    );

    // Get the search input field and search button
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const searchButton = screen.getByTestId('search-button');

    // Enter a value in the search input field
    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    // Verify that the search input value is updated
    expect(searchInput.value).toBe('chicken');

    // Submit the search form by clicking the search button
    fireEvent.click(searchButton);

    // You can add more assertions here to test the expected behavior based on the search functionality
  });
});
