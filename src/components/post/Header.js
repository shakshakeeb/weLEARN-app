import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useUser } from "../../hooks/users";
import Avatar from "../pages/profile/Avatar";
import { format, formatDistanceToNow } from "date-fns";
import Travel from "../pages/profile/Travel";

export default function Header({ uid, date }) {
    const { user, isLoading } = useUser(uid);

    if(isLoading) return "Loading"
  return (
    <Flex
    alignItems="center"
    borderBottom="2px solid"
    borderColor="blackAlpha"
    p="3"
    bgGradient='linear(to-r, pink.100, pink.500)'
    >
        <Avatar user={user} size="md" />

        <Box ml="4" >
            <Travel user={user} />
            <Button colorScheme="blackAlpha" variant="link">
              
            </Button>
            <Text fontSize="sm" color="black">
                {formatDistanceToNow(date)} ago
            </Text>
        </Box>
    </Flex>

  );
}
