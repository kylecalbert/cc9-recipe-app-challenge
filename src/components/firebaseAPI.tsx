import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; 

export const addToFavorites = async (recipeUri: string, userId: string | null) => {
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
      favoriteRecipes: arrayUnion(recipeUri),
    });
  } else {
    // Create a new document with the specified ID if the document doesn't exist
    await setDoc(userDocRef, {
      favoriteRecipes: [recipeUri],
      userId: userId,
    });
  }
};

export const removeFromFavorites = async (recipeUri: string, userId: string | null) => {
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
      favoriteRecipes: arrayRemove(recipeUri),
    });
  }
};
