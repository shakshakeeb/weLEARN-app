import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } from "firebase/auth";
  import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
  import { auth, db } from "../lib/firebase";
  import { useEffect, useState } from "react";
  import { HOME, LOGIN } from "../lib/routes";
  import { useToast } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import { setDoc, doc, getDoc } from "firebase/firestore";
  import usernameExist from "../utils/usernameExist";
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

  
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth); // Custom hook `useAuthState` is called with `auth` as an argument and returns `authUser`, `authLoading`, and `error` values.
  const [isLoading, setLoading] = useState(true); // State hook to track loading status, initialized to `true`.
  const [user, setUser] = useState(null); // State hook to store user data, initialized to `null`.

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading status to `true` before fetching data.
      const ref = doc(db, "users", authUser.uid); // Create a reference to a document in Firestore using `db` and `authUser.uid`.
      const docSnap = await getDoc(ref); // Fetch the document snapshot from Firestore.
      setUser(docSnap.data()); // Set the user data from the document snapshot.
      setLoading(false); // Set loading status to `false` after fetching data.
    }

    if (!authLoading) {
      if (authUser) fetchData(); // If `authLoading` is `false` and `authUser` exists, fetch user data.
      else setLoading(false); // If not signed in, set loading status to `false`.
    }
  }, [authLoading]); // Only run this effect when `authLoading` changes.

  return { user, isLoading, error }; // Return the `user` data, `isLoading` status, and `error` value as an object.
}

  

  export function useGoogle() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();


    const googLogin = async (redirectTo = HOME) => {
     try{
       const result = await signInWithPopup(auth, googleProvider);
       console.log(result.user);
       toast({
         title: "You are logged in",
         status: "success",
         isClosable: true,
         position: "top",
         duration: 5000,
       });
       //redirect user to home page if sign in is succesful
       navigate(redirectTo);
       //else catch error toast displays logging in failed
     } catch (error) {
       toast({
         title: "Logging in failed",
         description: error.message,
         status: "error",
         isClosable: true,
         position: "top",
         duration: 5000,
       });
       //loading to false to redisplay button so loading state is not forever
       setLoading(false);
     } finally {
       setLoading(false);
     }
   }
   return { googLogin, isLoading };
  }



// Define a custom hook 'useLogin' for handling login functionality
export function useLogin() {
  // Initialize state for 'isLoading' and 'setLoading' using the 'useState' hook
  const [isLoading, setLoading] = useState(false);
  
  // Access the 'toast' and 'navigate' functions from other hooks
  const toast = useToast();
  const navigate = useNavigate();

  // Define an asynchronous function 'login' for logging in with email and password
  async function login({ email, password, redirectTo = HOME }) {
    // Set 'isLoading' state to true to indicate that login process has started
    setLoading(true);

    try {
      // Call the 'signInWithEmailAndPassword' function with the provided 'email' and 'password'
      await signInWithEmailAndPassword(auth, email, password);

      // Show a success toast notification
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });

      // Navigate to the specified 'redirectTo' path
      navigate(redirectTo);
    } catch (error) {
      // Show an error toast notification
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });

      // Set 'isLoading' state to false to indicate that login has failed
      setLoading(false);
    } finally {
      // Set 'isLoading' state to false to indicate that login works
      setLoading(false);
    }
  }

  // Return the 'login' function and 'isLoading' state as an object from the custom hook
  return { login, isLoading };
}


  
  export function useRegister() {
    const [isLoading, setLoading] = useState(false); // State hook to track loading status, initialized to `false`.
    const toast = useToast(); // Custom hook `useToast` for displaying toast messages.
    const navigate = useNavigate(); // Custom hook `useNavigate` for navigation.
  
    async function register({
      username,
      email,
      password,
      redirectTo = HOME,
    }) {
      setLoading(true); // Set loading status to `true` before starting registration process.
  
      const usernameExists = await usernameExist(username); // Call a function `usernameExist` to check if the provided username already exists.
  
      if (usernameExists) {
        // If username already exists, display an error toast and set loading status to `false`.
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 4000,
        });
        setLoading(false);
      } else {
        try {
          // If username is available, attempt to create a new user account with the provided email and password.
          const res = await createUserWithEmailAndPassword(auth, email, password);
  
          // Create a new document in Firestore with user data (id, username, avatar, date, bio).
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            avatar: "",
            date: Date.now(),
            bio: "",
          });
  
          // Display a success toast for account creation, navigate to the provided `redirectTo` page.
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 4000,
          });
          navigate(redirectTo);
        } catch (error) {
          // If account creation fails, display an error toast with the error message.
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 4000,
          });
        } finally {
          setLoading(false); // Set loading status to `false` after the registration process completes.
        }
      }
    }
  
    return { register, isLoading }; // Return the `register` function and `isLoading` status as an object.
  }
  
  
// This function uses the Firebase SDK to handle user logout
export function useLogout() {
  // Get the signOut function from the Firebase auth API, as well as isLoading and error state
  const [signOut, isLoading, error] = useSignOut(auth);
  
  // Use the useToast and useNavigate hooks from the Chakra UI library
  const toast = useToast();
  const navigate = useNavigate();
  
  // Define an async logout function that calls signOut and shows a toast notification upon successful logout
  async function logout() {
    if (await signOut()) {
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
      navigate(LOGIN);
    } else {
      // If signOut fails, show an error message
      // Note that this code path will not be reached if an error is thrown (e.g. due to network issues)
      toast({
        title: "Failed to log out",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 4000,
      });
    }
  }
  
  // Return an object with the logout function and isLoading state
  return { logout, isLoading };
}






