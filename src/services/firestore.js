import { db } from "../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useFirestore = () => {
  const toast = useToast();

  // Add a search query to search history
  const addSearchHistory = async (userId, query) => {
    try {
      const timestamp = new Date();
      const ref = await addDoc(collection(db, "users", userId, "searchHistory"), {
        query,
        timestamp,
      });
      console.log("Search history added:", ref.id);
    } catch (error) {
      console.error("Error adding search history:", error);
    }
  };

  // Get all search history for a user
  const getSearchHistory = useCallback(async (userId) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "searchHistory")
      );
      const data = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()); // Sort by timestamp
      console.log("Fetched search history:", data);
      return data;
    } catch (error) {
      console.error("Error fetching search history:", error);
      return [];
    }
  }, []);

  // Clear all search history for a user
  const clearSearchHistory = async (userId) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "searchHistory")
      );
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      toast({
        title: "Success!",
        description: "Search history cleared.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error clearing search history:", error);
      toast({
        title: "Error!",
        description: "An error occurred while clearing search history.",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Other existing watchlist-related methods
  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast({
          title: "Error!",
          description: "This item is already in your watchlist.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Success!",
        description: "Added to watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding document:", error);
      toast({
        title: "Error!",
        description: "An error occurred.",
        status: "error",
        isClosable: true,
      });
    }
  };

  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(db, "users", userId, "watchlist", dataId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "watchlist", dataId));
      toast({
        title: "Success!",
        description: "Removed from watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred.",
        status: "error",
        isClosable: true,
      });
      console.error("Error while deleting doc:", error);
    }
  };

  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }, []);

  return {
    addSearchHistory,
    getSearchHistory,
    clearSearchHistory,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
  };
};
