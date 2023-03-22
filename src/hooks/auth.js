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
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
  

    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        const ref = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(ref);
        setUser(docSnap.data());
        setLoading(false);
      }
  
      if (!authLoading) {
        if (authUser) fetchData();
        else setLoading(false); // Not signed in
      }
    }, [authLoading]);
  
    return { user, isLoading, error };
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



  export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

  
    async function login({ email, password, redirectTo = HOME }) {
      setLoading(true);
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Logging in failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  
    return { login, isLoading };
  }


  
  export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    async function register({
      username,
      email,
      password,
      redirectTo = HOME,
    }) {
      setLoading(true);
  
      const usernameExists = await usernameExist(username);
  
      if (usernameExists) {
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        setLoading(false);
      } else {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
  
          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            username: username.toLowerCase(),
            avatar: "",
            date: Date.now(),
          });
  
          toast({
            title: "Account created",
            description: "You are logged in",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
  
          navigate(redirectTo);
        } catch (error) {
          toast({
            title: "Signing Up failed",
            description: error.message,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
      }
    }
  
    return { register, isLoading };
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
        duration: 5000,
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
        duration: 5000,
      });
    }
  }
  
  // Return an object with the logout function and isLoading state
  return { logout, isLoading };
}
