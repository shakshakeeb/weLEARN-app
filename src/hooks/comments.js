import { useToast } from '@chakra-ui/react';
import { setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { uuidv4 } from '@firebase/util';
import { db } from '../lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, where, orderBy, collection, query, deleteDoc } from "firebase/firestore";



// takes in an object with two properties postID and uid.
export default function useAddComment({postID, uid}) {
  const [ isLoading, setLoading ] = useState(false); // isLoading state manage loading status
  const toast = useToast(); // toast notification 

  // asynchronous function that adds a comment to the database
  async function addComment(text){
      setLoading(true); // Set isLoading to true 
      const date = Date.now(); // Get the current timestamp
      const id = uuidv4(); // Generate a unique ID 
      const docRef = doc(db, "comments", id); // Create Firestore document ref with comments collection, and generated ID
      await setDoc(docRef, { text, id, postID, date, uid}); // Set document data with the provided text, generated ID, postID, timestamp, and uid

      // Show a success toast notification
      toast({
          title: "Comment added",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 4000
      });

      setLoading(false); // Set isLoading to false to indicate that the op is complete
  }

  // Return the addComment function and isLoading state to be used by the caller of this hook
  return {addComment, isLoading}
}



export function useComments(postID){
    const q = query(collection(db, "comments"), where("postID", "==", postID), orderBy("date", "asc", ));

    const [comments, isLoading, error ] = useCollectionData(q);

    if(error) throw error;

    return { comments, isLoading } 
}


export function useDeleteComment(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
  
    async function deleteComment() {
      const res = window.confirm("Are you sure you want to delete this comment?");
  
      if (res) {
        setLoading(true);
        const docRef = doc(db, "comments", id);
        await deleteDoc(docRef);
        toast({
          title: "Comment deleted!",
          status: "info",
          isClosable: true,
          position: "top",
          duration: 4000,
        });
        setLoading(false);
      }
    }
  
    return { deleteComment, isLoading };
  }