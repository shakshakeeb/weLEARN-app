import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAddMessage } from "../../../hooks/chats";
import { useAuth } from "../../../hooks/auth";
import { v4 as uuidv4 } from "uuid";

export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { addMessage, isLoading } = useAddMessage();
  const { user, isLoading: authLoading, error } = useAuth(); // Get the current user

  // Display a loading screen while authentication is in progress
  if (authLoading) {
    return <Text>Loading authentication...</Text>;
  }

  // If there is no authenticated user, display an error message
  if (!user) {
    return (
      <Box w="100%" h="100%" bg="gray.100" margin="20px">
        <Flex justify="center" align="center" h="10vh" bg="red.300" color="white">
          <Heading as="h1" size="xl">
            Please log in to access the chatroom.
          </Heading>
        </Flex>
      </Box>
    );
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === "") return;

    const messageID = uuidv4(); // Generate a unique ID for the message
    const newMessage = {
      text: { text: message },
      messageID,
      uid: user.id,
    };

    try {
      await addMessage(newMessage);
      setMessages([...messages, { sender: user.username, content: message }]);
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <Box w="100%" h="100%" bg="gray.100" margin="20px">
      <Flex justify="center" align="center" h="10vh" bg="blue.300" color="white">
        <Heading as="h1" size="xl">
          Chatroom
        </Heading>
      </Flex>
      <Box p={4}>
        {messages.map((msg, index) => (
          <Text key={index}>
            {msg.sender}: {msg.content}
          </Text>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <Box p={4}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={handleMessageChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" type="submit" isLoading={isLoading}>
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </form>
    </Box>
  );
}
