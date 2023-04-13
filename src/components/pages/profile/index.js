import { useState } from "react";
import { HStack, Stack, Text, Flex, Divider, Textarea, Button, Code, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../../hooks/posts";
import { useUser } from "../../../hooks/users";
import PostsLists from "../../post/PostsLists";
import Avatar from "../profile/Avatar";
import User from "../../users/User";
import format from "date-fns/format";
import { useAuth } from "../../../hooks/auth";
import { useBio } from "../../../hooks/users";
import ChangeAvatar from "./ChangeAvatar";

export default function Profile() {
  // Get user ID from URL params
  const { id } = useParams();

  // Fetch posts and loading state from usePosts hook
  const { posts, isLoading: postsLoading } = usePosts(id);

  // Fetch user and loading state from useUser hook
  const { user, isLoading: userLoading } = useUser(id);

  // Fetch authenticated user and loading state from useAuth hook
  const { user: authUser, isLoading: authLoading } = useAuth();

  // Fetch bio and bio setter from useBio hook
  const { bio, setBio } = useBio(id);

  // State for tracking bio update status and error
  const [isUpdating, setIsUpdating] = useState(false);
  const [bioText, setBioText] = useState(bio);
  const [error, setError] = useState(null);

  // Disclosure state for avatar change modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle form submit for bio update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set updating status and clear error
    setIsUpdating(true);
    setError(null);

    try {
      // Update bio with new text
      await setBio(bioText);
      setBioText(bioText);
    } catch (error) {
      // Catch and set error if any occurs
      setError(error);
    }

    // Reset updating status
    setIsUpdating(false);
  };

  // If any of the data is still loading, show loading message
  if (userLoading || authLoading || postsLoading) {
    return "Loading...";
  }

  // If user or authUser is not found, show user not found message
  if (!user || !authUser) {
    return "User not found.";
  }

  // Check if the authenticated user is the same as the user being viewed
  const canEdit = authUser.uid === user.id;

  // Render profile information, including avatar change modal
  return (
    <Stack spacing="5">
      <Flex p={["4", "6"]} pos="relative" align="center">
        <Avatar size="2xl" user={user} />
        {!authLoading && authUser.id === user.id && (
          <Button
            pos="absolute"
            mb="2"
            top="6"
            right="6"
            colorScheme="pink"
            onClick={onOpen}
          >
            Change Avatar
          </Button>
        )}
        <Stack ml="10">
          <Text fontSize="2xl">{user.username}</Text>
          <Stack spacing="10">
            <Text>has posted {posts.length} time(s) to the forum</Text>
            <Text>Joined: {format(user.date, "dd MMMM YYY")}</Text>
            {canEdit && (
              <form onSubmit={handleSubmit}>
                <Textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  isDisabled={isUpdating}
                />
                <Button onClick={handleSubmit}>Update Bio</Button>
                {error && <Code>{error.message}</Code>}
              </form>
            )}
            {!canEdit && bio && <Text>Bio: {bio}</Text>}
          </Stack>
        </Stack>
        <ChangeAvatar isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />
    </Stack>
  );
}
