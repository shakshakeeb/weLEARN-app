import { Box, Text } from "@chakra-ui/react";
import Header from "../post/Header";
import Interactions from "../post/Interactions";


export default function Post({post}) {
    const { text, uid, date } = post;
  
    return (
      <Box p="2" maxW="600px" textAlign="left" margin="20px">
        <Box border="2px solid" borderColor="gray.100" borderRadius="md">
          <Header uid={uid} date={date} />
  
          <Box p="2" minH="100px">
            <Text wordBreak="break-word" fontSize="md" backgroundColor="orange" fontWeight="black" >
                {text}
            </Text>
          </Box>
  
          <Interactions post={post} />
        </Box>
      </Box>
    );
  }