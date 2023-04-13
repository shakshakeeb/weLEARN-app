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


import { Button, Flex, Link, extendTheme, useColorMode, IconButton, Box, Stack, Code } from "@chakra-ui/react";
import { HOME } from "../../lib/routes";
import { FORUM } from "../../lib/routes";
import { CHATROOM } from "../../lib/routes";
import { PROFILE } from "../../lib/routes";

import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth";
import { useLogin } from "../../hooks/auth";
import Login from "../auth/Login";

import { useAuth } from "../../hooks/auth";
import { PROTECTED, USER } from "../../lib/routes";

import Avatar from "../pages/profile/Avatar";

import { CiDark } from "react-icons/ci";

// function ActiveUser() {
//   const { user, isLoading } = useAuth();

//   if (isLoading) return "Loading...";

//   return (
//     <Stack align="center" spacing="5" my="8">
//       <Avatar user={user} />
//       <Code>@{user.username}</Code>
//       <Button
//         colorScheme="teal"
//         w="full"
//         as={Link}
//         to={`${PROTECTED}/profile/${user.id}`}
//       >
//         Edit Profile
//       </Button>
//     </Stack>
//   );
// }

export default function Navbar() {
  const { logout, isLoading } = useLogout();
  const { user } = useAuth();

  const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

  const theme = extendTheme({ config })

  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      shadow="sm"
      textAlign="center"
      width="full"
      borderTopColor="blackAlpha"
      height="20"
      zIndex="3"
      justifyContent="space-between"

      bgGradient='linear(to-r, green.200, pink.500)'
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
        {user && (
  <Link color="blackAlpha" as={RouterLink} to={`${PROTECTED}/profile/${user.id}`} fontWeight="bold">
    Profile
  </Link>
)}
   

        <Button
          ml="auto"
          colorScheme="blackAlpha"
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Logout
        </Button>
        <Flex ml="auto" align="center"> 
          <IconButton 
            icon={<CiDark />}
            variant="ghost"
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </IconButton>
      </Flex>
    </Flex>
    </Flex>
  );
  
}

