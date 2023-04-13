import { uuidv4 } from "@firebase/util";
import { useState } from "react";
import { db } from "../lib/firebase";
import { doc, setDoc, getDocs, query, collection, orderBy, where, updateDoc, arrayRemove, arrayUnion, deleteDoc
 } from "firebase/firestore";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useToast } from "@chakra-ui/react";



export function useAddPost() {

    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    //firestore collection for posts being added to db
    async function addPost(post) {
        //db for posts. id is for post id 
        setLoading(true);
        const id = uuidv4();
        //firestore collection for all 
        await setDoc(doc(db, "posts", id), {
            ...post,
            id,
            date: Date.now(),
            likes: [],
            dislikes: [],
        });
        toast({
            title: "Post sent",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
        setLoading(false);

    }
    return { addPost, isLoading };
}


// This function uses Firebase Firestore to fetch all posts from the "posts" collection
export function usePosts(uid = null) {
    // Create a query object for the "posts" collection
    const q = uid ? query(collection(db, "posts"), 
    orderBy('date', 'desc'), where("uid", "==", uid)): 
    query(collection(db, "posts"), orderBy("date", "desc"));
    
    // Use the useCollectionData hook from the Firebase SDK to get the posts data, as well as isLoading and error state
    const [posts, isLoading, error] = useCollectionData(q);
    
    // If there's an error, throw it so the error can be handled elsewhere
    if(error) throw error;
    
    // Return an object with the posts data and isLoading state
    return { posts, isLoading };
  }
  

  export function useToggle({id, isLiked, uid}) {
    const [isLoading, setLoading] = useState(false); // State to track whether the update operation is currently loading

    async function toggle() { // Async function that toggles the like status
        setLoading(true); // Set loading state to true to indicate that the update operation is in progress
        const docRef = doc(db, "posts", id); // Reference to the Firestore document to be updated
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid), // Update the 'likes' field of the document based on the current like status (add or remove 'uid' from the array)
        });
        setLoading(false); // Set loading state to false to indicate that the update operation is complete
    }

    return { toggle, isLoading }; // Return the toggle function and isLoading state to be used in the consuming component
}



  export function useToggleDownvote({id, isDisliked, uid}){
    const [isLoading, setLoading] = useState(false);

    async function toggleDownvote() {
      setLoading(true);
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        dislikes: isDisliked ? arrayRemove(uid) : arrayUnion(uid),
      });
      setLoading(false);
    }
  
    return { toggleDownvote, isLoading };

  }
  
  export function usePost(id) {
    const q = doc(db, "posts", id); // Reference to the Firestore document with the provided ID
    const [post, isLoading] = useDocumentData(q); // Fetch the post document data using the useDocumentData hook from the Firebase SDK, and track the loading state
    
    return { post, isLoading }; // Return the post document data and isLoading state to be used in the consuming component
}



  export function useRemovePost(id){
    const [isLoading, setLoading ] = useState(false);
    const toast = useToast();

    async function removePost(){
        const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "posts", id));

      // Delete comments
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast({
        title: "Post deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });

      setLoading(false);
    }

    }

    return { removePost, isLoading}
  }


 