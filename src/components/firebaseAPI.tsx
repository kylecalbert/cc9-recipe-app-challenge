import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc, where, query, getDocs } from 'firebase/firestore';
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

export const fetchFavoriteRecipes = async (userId: string) => {
  const userFavoritesCollectionRef = collection(firestore, 'userFavorites');
  const userFavoritesQuery = query(userFavoritesCollectionRef, where('userId', '==', userId));
  const userFavoritesSnapshot = await getDocs(userFavoritesQuery);

  if (!userFavoritesSnapshot.empty) {
    const userFavoritesData = userFavoritesSnapshot.docs[0].data();
    return userFavoritesData.favoriteRecipes || [];
  }

  return [];
};
