import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc, where, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { FavoriteRecipe } from '../context/RecipeContext';

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
