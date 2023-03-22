// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import './Navbar.css';

// function Navbar() {
//     const [click, setClick] = useState(false);
//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);
//   return (
//     <>
//     <nav className='navbar'>
//         <div className='navbar-container'>
//             <Link to='/' className='navbar-logo'>
//                 weLEARN <i className='fab fa-typo3' />
//                  </Link>
//                  <div className='menu-icon' onClick={handleClick}>
//                     <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
//                  </div>
//                  <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
//                  <li className='nav-item'>
//                     <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//                         Home
//                     </Link>
//                  </li>
//                  <li className='nav-item'>
//                     <Link to='/forum' className='nav-links' onClick={closeMobileMenu}>
//                         Forum
//                     </Link>
//                  </li>
//                  <li className='nav-item'>
//                     <Link to='/chat' className='nav-links' onClick={closeMobileMenu}>
//                         Chatroom hub
//                     </Link>
//                  </li>
//                  <li className='nav-item'>
//                     <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
//                         Profile
//                     </Link>
//                  </li>
//                  </ul>
//         </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar


import { Button, Flex, Link } from "@chakra-ui/react";
import { HOME } from "../../lib/routes";
import { FORUM } from "../../lib/routes";
import { CHATROOM } from "../../lib/routes";
import { PROFILE } from "../../lib/routes";

import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth";
import { useLogin } from "../../hooks/auth";
import Login from "../auth/Login";

export default function Navbar() {
  const { logout, isLoading } = useLogout();

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTopColor="blackAlpha"
      height="20"
      zIndex="3"
      justifyContent="center"
      bg="yellow.400"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link color="blackAlpha" as={RouterLink} to={HOME} fontWeight="bold">
          Home
        </Link>

        <Flex px="4" w="full" align="center" maxW="100px"></Flex>
        <Link color="blackAlpha" as={RouterLink} to={FORUM} fontWeight="bold">
          Forum
        </Link>

        <Flex px="4" w="full" align="center" maxW="100px"></Flex>
        <Link color="blackAlpha" as={RouterLink} to={CHATROOM} fontWeight="bold">
          Chatroom
        </Link>

        <Flex px="4" w="full" align="center" maxW="100px"></Flex>
        <Link color="blackAlpha" as={RouterLink} to={PROFILE} fontWeight="bold">
          Profile
        </Link>
        <Button
          ml="auto"
          colorScheme="blackAlpha"
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Logout
        </Button>
        {/* <Button
          ml="auto"
          colorScheme="blackAlpha"
          size="sm"
          onClick={Login}
          isLoading={isLoading}
        >
          Login
        </Button> */}
      </Flex>
    </Flex>
  );
  
}

