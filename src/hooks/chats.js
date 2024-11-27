import { 
  setDoc, 
  doc, 
  query, 
  collection, 
  where, 
  orderBy, 
  serverTimestamp,
  getDocs,
  getDoc 
} from 'firebase/firestore';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../lib/firebase'; // Ensure Firebase is correctly imported
import { useCollectionData } from 'react-firebase-hooks/firestore';

export function useChat() {
  const [isLoading, setLoading] = useState(false);

  // Add a new chat to Firestore
  async function addChat(chat) {
    console.log("Adding chat with data:", chat);  // Log chat data for debugging

    // Validate chat data
    if (!chat || !chat.title || !chat.description) {
      console.error("Invalid chat data:", chat);
      throw new Error("Chat data is incomplete.");
    }

    try {
      setLoading(true);
      const id = uuidv4(); // Generate a unique ID for the chat
      await setDoc(doc(db, "chats", id), {
        ...chat,  // Spread the chat data into the Firestore document
        id,
        date: serverTimestamp(),
        recipient: [],
        sender: [],
      });
      console.log("Chat added successfully!");
    } catch (error) {
      console.error("Error adding chat:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Retrieve all chats from Firestore
  async function getAllChats() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "chats"));
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error('Error getting chats:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Retrieve a chat by its ID
  async function getChatById(id) {
    setLoading(true);
    try {
      const docRef = doc(db, "chats", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
      }
      return null;
    } catch (error) {
      console.error('Error getting chat:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { addChat, getAllChats, getChatById, isLoading };
}

// Add a new message to the Firestore 'messages' collection
export function useAddMessage(messageID, uid) {
  const [isLoading, setLoading] = useState(false);

  async function addMessage({ text, messageID, uid }) {
    console.log("Adding message with data:", { text, messageID, uid });

    // Ensure all required fields are provided
    if (!text || !messageID || !uid) {
      console.error("Invalid message data:", { text, messageID, uid });
      throw new Error("Message data is incomplete.");
    }

    try {
      setLoading(true);
      const id = uuidv4(); // Generate a unique ID for the message
      await setDoc(doc(db, "messages", id), {
        text: text.text,  // Ensure text is being passed as an object
        messageID,
        uid,
        date: serverTimestamp(),
      });
      console.log("Message added successfully!");
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { addMessage, isLoading };
}

// Retrieve messages from the Firestore 'messages' collection
export function useMessage(messageID = null) {
  const q = query(
    collection(db, "messages"), 
    where("messageID", "==", messageID), 
    orderBy("date", "asc")
  );

  const [messages, isLoading, error] = useCollectionData(q, { idField: 'id' });

  if (error) {
    console.error('Error in useMessage:', error);
    throw error;
  }

  return { messages, isLoading };
}
