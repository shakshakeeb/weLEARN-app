import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from "../lib/firebase";
import { doc, query, collection } from "firebase/firestore";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);
  console.log("user:", user);
  return { user, isLoading };
}

export function useUsers() {
    const [users, isLoading] = useCollectionData(collection(db, "users"));
    return { users, isLoading };
  }
