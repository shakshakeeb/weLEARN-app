import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react";
  import { useAuth } from "../../../hooks/auth";
  import { useUpdateAvatar } from "../../../hooks/users";
  import Avatar from "./Avatar";
  
 // Component for changing user avatar with a modal
export default function ChangeAvatar({ isOpen, onClose }) {
  // Custom hook for getting user information and loading state from authentication
  const { user, isLoading: authLoading } = useAuth();
  // Custom hook for updating avatar with loading state and file URL
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id);

  // Function for handling file change event
  function handleChange(e) {
    // Set the selected file to the state using the setFile function
    setFile(e.target.files[0]);
  }

  // Render "Loading..." if authentication data is still loading
  if (authLoading) return "Loading...";

  // Render the modal with profile editing form
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing="5">
            {/* Render user avatar component with option to override with file URL */}
            <Avatar user={user} overrideAvatar={fileURL} />
            <FormControl py="4">
              <FormLabel htmlFor="picture">Change Avatar</FormLabel>
              {/* Render file input for selecting new avatar */}
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>
          {/* Render save button with loading state */}
          <Button
            loadingText="Uploading"
            w="full"
            my="6"
            colorScheme="pink.500"
            onClick={updateAvatar}
            isLoading={fileLoading}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
