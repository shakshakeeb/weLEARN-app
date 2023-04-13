import { LOGIN, USER } from "../../lib/routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../hooks/auth"
import { Link } from "react-router-dom";


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
        {/* <Button
          variant="outline"
          colorScheme="blue"
          as={Link}
          to={USER}
          mt="4"
          size="sm"
          >
        </Button> */}
      </>
    );
    
}
