import { createBrowserRouter } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Layout from "../components/layout";
import Home from "../components/pages/Home"


export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected"
export const HOME = "/protected/home";
export const FORUM = "/protected/forum";
export const CHATROOM = "/protected/chatroom";
export const PROFILE = "/protected/profile";

export const router = createBrowserRouter([

    {path: ROOT, element: "Public Root" },
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
            element: "Forum",
        },
        {
            path: CHATROOM,
            element: "Chatroom",
        },
        {
            path: PROFILE,
            element: "Profile",
        },
    ],
 }, 
]);