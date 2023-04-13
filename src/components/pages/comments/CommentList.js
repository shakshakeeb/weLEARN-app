import { Box } from "@chakra-ui/react";
import { useComments } from "../../../hooks/comments";
import Comment from "../comments/Comment";

// Define a default export function called CommentList that takes a post prop as an argument
export default function CommentList({post}){
  // Destructure the id property from the post prop
  const {id } = post; 
  
  // Call a custom hook called useComments with id as an argument, and destructure the returned comments and isLoading values
  const {comments, isLoading } = useComments(id);

  // If comments are still loading, return "Loading"
  if(isLoading) return "Loading";

  // Otherwise, render a list of comments using comments array
  return (
      <Box>
        {comments.map((comment) => (
          // Render a Comment component for each comment with a unique key
          <Comment key={comment.id} comment={comment} />
        ))}
      </Box>
  );
}





