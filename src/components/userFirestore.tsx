import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { useAuthentication } from './AuthUtils';

const addToFavorites = async (recipeUri: string, userId: string | null) => {
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
    // Create a new document with the specified ID if document doesn't exist
    await setDoc(userDocRef, {
      favoriteRecipes: [recipeUri],
      userId: userId,
    });
  }
};

export default addToFavorites;
