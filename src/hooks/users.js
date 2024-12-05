import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db, storage } from "../lib/firebase";
import { doc, query, collection, updateDoc } from "firebase/firestore";
//import { Box, Button, Code, Stack } from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";
//import { PROTECTED, USERS } from "../lib/routes";
//import { Link } from "react-router-dom";
//import Avatar from "../components/pages/profile/Avatar";
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);
  return { user, isLoading };
}

export function useUsers() {
    const [users, isLoading] = useCollectionData(collection(db, "users"));
    return { users, isLoading };
  }

  export function useBio(id) {
    const { user } = useAuth();
    const userDocRef = doc(db, "users", id);
    const [userDoc] = useDocumentData(userDocRef);
  
    async function setBio(bioText) {
      if (!user) {
        throw new Error("User must be logged in to set bio.");
      }
  
      try {
        await updateDoc(userDocRef, {
          bio: bioText
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    return { bio: userDoc?.bio, setBio };
  }

export function useUpdateBio(uid) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  async function updateBio(bio) {
    try {
      setIsUpdating(true);
      await updateDoc(doc(db, "users", uid), {
        bio: bio,
      });
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      setError(error);
    }
  }

  return { isUpdating, error, updateBio };
}

// Custom hook for updating user avatar in Firebase Storage and Firestore
export function useUpdateAvatar(uid) {
  // State for tracking loading state
  const [isLoading, setLoading] = useState(false);
  // State for storing the selected file
  const [file, setFile] = useState(null);
  // Toast notification hook for showing error/success messages
  const toast = useToast();
  // Navigation hook for redirecting after profile update
  const navigate = useNavigate();

  // Function for updating the avatar
  async function updateAvatar() {
    // Check if a file is selected
    if (!file) {
      // Show an error toast if no file is selected
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    // Set loading state to true while uploading
    setLoading(true);

    // Create a file reference with the uid as the file path in Firebase Storage
    const fileRef = ref(storage, "avatars/" + uid);
    // Upload the selected file to Firebase Storage
    await uploadBytes(fileRef, file);

    // Get the download URL of the uploaded file
    const avatarURL = await getDownloadURL(fileRef);

    // Create a document reference for the user in Firestore
    const docRef = doc(db, "users", uid);
    // Update the 'avatar' field of the user document with the avatarURL
    await updateDoc(docRef, { avatar: avatarURL });

    // Show a success toast after profile update
    toast({
      title: "Profile updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    // Reset loading state
    setLoading(false);

    // Navigate to the home page after profile update
    navigate(0);
  }

  // Return necessary values and functions as an object for external usage
  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
