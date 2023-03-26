import { Box, Text } from "@chakra-ui/react";
import Post from ".";



export default function PostsLists({ posts }) {
  return ( 
    <Box px="4" align="center" >
      {posts?.length === 0 ? ( 
        <Text textAlign="center" fontSize="xl">
          Empty ... why don't you say something?
        </Text>
         ) : ( 
          posts?.map((post)=> <Post key={post.id} post={post} />)
          )}
        </Box>
  );
}



