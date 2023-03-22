import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <Box w="100%" h="100%" bg="gray.100" margin="20px" >
      <Flex
        justify="center"
        align="center"
        h="10vh"
        bg="blue.300"
        color="white"
      >
        <Heading as="h1" size="xl">
          Chatroom
        </Heading>
      </Flex>
      <Box p={4}>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
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
              <Button h="1.75rem" size="sm" type="submit">
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </form>
    </Box>
  );
};

export default Chat;
