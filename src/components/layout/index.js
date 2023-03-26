import { LOGIN } from "../../lib/routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../hooks/auth"

export default function Layout() {
    const { pathname } = useLocation()
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

   

    useEffect(() => {
        if (!isLoading && pathname.startsWith("/protected") && !user) {
          navigate(LOGIN);
        }
      }, [pathname, user, isLoading, navigate]);

    if(isLoading) return "Loading...";


    return (
      <>
        <Navbar />
        <Flex pt="16" pb="12" mx="auto" w="full">
          <Box w="100%"  minH="100vh">
            <Outlet />
          </Box>
        </Flex>
      </>
    );
    
}
