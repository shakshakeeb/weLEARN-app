import React from 'react'
import {Box, Button, Flex, Input } from "@chakra-ui/react";
import { useAuth } from '../../../hooks/auth';
import Avatar from '../profile/Avatar';
import { useForm } from 'react-hook-form';
import useAddComment from '../../../hooks/comments';


export default function NewComment({post}) {
  // Destructure the id property from the post prop and assign it to a variable postID
  const {id: postID } = post;

  // custom hook called useAuth() to get user auth 
  const {user, isLoading: authLoading } = useAuth();

  // custom hook called useForm() to handle form submission
  const { register, handleSubmit, reset } = useForm();

  // Call custom hook useAddComment() to handle adding a new comment  
  const { addComment, isLoading: commentLoading } = useAddComment({postID, uid: user?.id, });

  // handles form submission
  function handleAddComment(data){
      // Call the addComment function with the comment text from form data
      addComment(data.text);
      // Reset the form
      reset();
  }

  // If user authentication info is still loading, return "Loading"
  if(authLoading) return "Loading";

  // Otherwise, render a form to add a new comment
  return (
      <Box maxW="600px" mx="auto" py="6">
        <Flex padding="4">
          <Avatar user={user} size="sm" />
          <Box flex="1" ml="4">
            <form onSubmit={handleSubmit(handleAddComment)}>
              <Box>
                <Input
                  size="sm"
                  variant="filled"
                  placeholder="Write comment..."
                  autoComplete="off"
                  {...register("text", { required: true })}
                />
              </Box>
              <Flex pt="2">
                <Button
                  isLoading={commentLoading || authLoading}
                  type="submit"
                  colorScheme="yellow"
                  size="xs"
                  ml="auto"
                >
                  Add Comment
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    );
}


