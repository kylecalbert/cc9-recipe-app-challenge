import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { useAuthentication } from './AuthUtils';
import { useRecipeContext } from '../context/RecipeContext';

// Mocking the AuthUtils module
jest.mock('./AuthUtils');
// Mocking the RecipeContext module
jest.mock('../context/RecipeContext');

describe('RecipeCard', () => {
  // Mock recipe data
  const recipe = {
    recipe: {
      label: 'Recipe Label',
      calories: '100',
      image: 'recipe-image.jpg',
      ingredients: [
        {
          text: 'Ingredient 1',
          quantity: 1,
          measure: 'cup',
          food: 'Ingredient Food',
          weight: 100,
          foodCategory: 'Ingredient Category',
          foodId: 'ingredient-id',
          image: 'ingredient-image.jpg',
        },
      ],
      uri: 'recipe-uri',
    },
  };

  // Mock favorite recipes data
  const favoriteRecipes = [
    {
      label: 'Favorite Recipe',
      calories: '200',
      image: 'favorite-image.jpg',
      ingredients: [
        {
          text: 'Ingredient 1',
          quantity: 1,
          measure: 'cup',
          food: 'Ingredient Food',
          weight: 100,
          foodCategory: 'Ingredient Category',
          foodId: 'ingredient-id',
          image: 'ingredient-image.jpg',
        },
      ],
      uri: 'favorite-uri',
    },
  ];

  beforeEach(() => {
    // Mock the useAuthentication hook to return user data
    (useAuthentication as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        uid: 'test-uid',
      },
      handleGoogleSignIn: jest.fn(),
      handleGoogleSignOut: jest.fn(),
    });

    // Mock the useRecipeContext hook to return favoriteRecipes and toggleFavorite function
    (useRecipeContext as jest.Mock).mockReturnValue({
      favoriteRecipes,
      toggleFavorite: jest.fn(),
    });
  });

  test('renders recipe card with label and calories', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    const labelElement = screen.getByTestId('recipe-label');
    const caloriesElement = screen.getByTestId('recipe-calories');

    // Check if label and calories elements are rendered with correct content
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.textContent).toBe('Recipe Label');
    expect(caloriesElement).toBeInTheDocument();
    expect(caloriesElement.textContent).toBe('100');
  });

  test('renders non-favorite icon for non-favorite recipe', () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    const favoriteIcon = screen.getByLabelText('add to favorites');

    // Check if favorite icon is rendered and doesn't have 'MuiIconButton-colorError' class
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).not.toHaveClass('MuiIconButton-colorError');
  });

  test('calls toggleFavorite when favorite icon is clicked', () => {
    // Create a mock function for toggleFavorite
    const toggleFavoriteMock = jest.fn();
    // Mock the useRecipeContext hook to return favoriteRecipes and the mock toggleFavorite function
    (useRecipeContext as jest.Mock).mockReturnValue({
      favoriteRecipes,
      toggleFavorite: toggleFavoriteMock,
    });

    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>
    );

    const favoriteIcon = screen.getByLabelText('add to favorites');
    fireEvent.click(favoriteIcon);

    // Check if toggleFavorite function is called with the recipe
    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(recipe);
  });
});
