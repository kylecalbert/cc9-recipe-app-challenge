import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc, where, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { FavoriteRecipe } from '../context/RecipeContext';



///we pass in userID so that we can know what users table to access, we also pass in the favorite recipe data
//so that we can add all the recipe data such as title, ingredients etc ...to firebase
export const addToFavorites = async (userId: string, favoriteRecipe: FavoriteRecipe) => {
  if (!userId) {
    throw new Error('User ID is null');
  }

  const userFavoritesCollectionRef = collection(firestore, 'userFavorites');
  const userDocRef = doc(userFavoritesCollectionRef, userId);

  // Checking if the document exists
  const docSnapshot = await getDoc(userDocRef);
  if (docSnapshot.exists()) {
    // Update the existing document
    await updateDoc(userDocRef, {
      favoriteRecipes: arrayUnion(favoriteRecipe),
    });
  } else {
    // Create a new document with the specified ID if the document doesn't exist
    await setDoc(userDocRef, {
      favoriteRecipes: [favoriteRecipe],
      userId: userId,
    });
  }
};


///removing from favorites function
export const removeFromFavorites = async (favoriteRecipe: FavoriteRecipe, userId: string) => {
  if (!userId) {
    throw new Error('User ID is null');
  }

  const userDocRef = doc(firestore, 'userFavorites', userId);

  const docSnapshot = await getDoc(userDocRef);
  if (docSnapshot.exists()) {
    const existingData = docSnapshot.data();
    const favoriteRecipes = existingData.favoriteRecipes || [];

    const updatedFavoriteRecipes = favoriteRecipes.filter(
      (recipe: FavoriteRecipe) => recipe.uri !== favoriteRecipe.uri
    );

    await updateDoc(userDocRef, {
      favoriteRecipes: updatedFavoriteRecipes,
    });
  } else {
    throw new Error('User document does not exist');
  }
};


///fetching the favorite recipes which are on firebase
export const fetchFavoriteRecipes = async (userId: string): Promise<FavoriteRecipe[]> => {
  const userFavoritesCollectionRef = collection(firestore, 'userFavorites');
  const userFavoritesQuery = query(userFavoritesCollectionRef, where('userId', '==', userId));
  const userFavoritesSnapshot = await getDocs(userFavoritesQuery);

  if (!userFavoritesSnapshot.empty) {
    const userFavoritesData = userFavoritesSnapshot.docs[0].data();
    return userFavoritesData.favoriteRecipes || [];
  }

  return [];
};
