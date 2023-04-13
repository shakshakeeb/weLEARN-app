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

export default function Chatroom() {
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const { addMessage, isLoading } = useAddMessage();
  const { user, isLoading: authLoading } = useAuth(); //current user object
  

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === "") return;
    const newMessage = { content: message, sender: senderName };
    addMessage(newMessage)
      .then(() => {
        setMessages([...messages, newMessage]);
        setMessage("");
      })
      .catch((error) => console.error(error));
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
