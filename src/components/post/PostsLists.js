import { Box, Text } from "@chakra-ui/react";
import Post from ".";


// Define a functional component called "PostsList" that takes a prop called "posts"
export default function PostsLists({ posts }) {
  return ( 
    <Box px="4" align="center" >
      {posts?.length === 0 ? ( 
        <Text textAlign="center" fontSize="xl">
          Empty ... why don't you say something?
        </Text>
         ) : ( 
           // If the "posts" array is not empty, map over it and render a "Post" component for each post
          posts?.map((post)=> <Post key={post.id} post={post} />)
          )}
        </Box>
  );
}



