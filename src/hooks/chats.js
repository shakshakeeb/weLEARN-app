// const [isLoading, setLoading] = useState(false);

// // Add a new chat message to the firestore collection
// async function addChat(chat) {
//     setLoading(true);
//     const id = uuidv4();
//     await setDoc(doc(db, "chats", id), {
//         ...chat,
//         id,
//         date: Date.now(),
//         recipient: [],
//         sender: [],
//     });
// }

// // Get all chat messages from the firestore collection
// async function getAllChats() {
//     setLoading(true);
//     const snapshot = await getDocs(collection(db, "chats"));
//     setLoading(false);
//     return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// }

// // Get a specific chat message by its ID from the firestore collection
// async function getChatById(id) {
//     setLoading(true);
//     const docRef = doc(db, "chats", id);
//     const docSnap = await getDoc(docRef);
//     setLoading(false);
//     if (docSnap.exists()) {
//         return { ...docSnap.data(), id: docSnap.id };
//     } else {
//         return null;
//     }
// }

// return { addChat, getAllChats, getChatById, isLoading };



import { setDoc, doc, query, collection, where, orderBy, serverTimestamp } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Make sure you import uuidv4 from the correct library
import { db } from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export function useAddMessage(messageID, uid) {
    const [isLoading, setLoading] = useState(false);
  
    async function addMessage(text) {
        console.log('addMessage function called with text:', text);
        try {
            setLoading(true);
            const id = uuidv4();
            console.log('Adding message to Firestore:', text);
            console.log('messageID:', messageID);
            console.log('uid:', uid);
            await setDoc(doc(db, "messages", id), {
                ...text,
                id,
                messageID,
                uid,
                createdAt: serverTimestamp(), // Make sure you are using the correct import for firebase object
            });
            console.log('Message added successfully');
        } catch (error) {
            console.error('Error adding message to Firestore:', error);
        } finally {
            setLoading(false);
        }
    }
  
    return { addMessage, isLoading };
}


export function useMessage(messageID = null){
    const q = query(collection(db, "messages"), where("messageID", "==", messageID), orderBy("date", "asc", ));

    const [messages, isLoading, error ] = useCollectionData(q);

    if(error) throw error;

    return { messages, isLoading } 
}




