import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Layout from "../components/layout";
import Home from "../components/pages/home/index";
import Forum from "../components/pages/forum/index";
import Chatroom from "../components/pages/chatroom/index";
import Comments from "../components/pages/comments/index";
import User from "../components/users/index";


//test use without root -------------------------------->



// export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

//when logged in users are protected

export const PROTECTED = "/protected"
export const HOME = "/protected/home";
export const FORUM = "/protected/forum";
export const CHATROOM = "/protected/chatroom";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id"
export const USER = "/protected/users";
 
export const router = createBrowserRouter([

    // {path: ROOT, element: "Public Root" }, testttttting


    


    {path: LOGIN, element: <Login />},
    {path: REGISTER, element: <Register />},

    {
        path: PROTECTED,
        element: <Layout />,
        children: [
        {
            path: HOME,
            element: <Home />,
        },
        {
            path: FORUM,
            element: <Forum />,
        },
        {
            path: CHATROOM,
            element: <Chatroom />,
        },
        {
            path: PROFILE,
            element: "Profile",
        },
        {
            path: COMMENTS,
            element: <Comments />,
        },
        {
            path: USER,
            element: <User />,
          },
    ],
 }, 
]);