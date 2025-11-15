import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Save user search
export const saveSearch = async (username) => {
  await addDoc(collection(db, "searchHistory"), {
    username,
    timestamp: new Date(),
  });
};

// Get all searches
export const getSearchHistory = async () => 
{
  const snap = await getDocs(collection(db, "searchHistory"));
  return snap.docs.map((doc) => doc.data());
};
