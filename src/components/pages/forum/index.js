import { Box, Button, Heading, HStack, Textarea } from "@chakra-ui/react";
import reactTextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddPost } from "../../../hooks/posts";
import { useAuth } from "../../../hooks/auth";
import PostsLists from "../../post/PostsLists";
import { usePosts } from "../../../hooks/posts";

function NewPost(){
        //react hook form
        const { register, reset, handleSubmit } = useForm(); 
        const { addPost, isLoading: addingPost } = useAddPost(); //if is loading, add post
        const { user, isLoading: authLoading } = useAuth(); //current user object
    
        //user id handler for post
        function handleAddPost(data){
            addPost({
                //owner 
                uid: user.id,
                text: data.text,
            })
            //post is displayed in console 
            console.log(data);
            reset();
        }

    return <Box justify="center"  maxW="800px" mx="100" py="20">
    <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between" backgroundColor="">
            <Heading size="lg" paddingLeft="300">Post something !</Heading>
            {/* if button is loading in loading state, or adding post is true */}
            <Button colorScheme="yellow" type="submit" isLoading={authLoading || addingPost} loadingText="Loading">
                Post
            </Button>
        </HStack>
        <Textarea as={reactTextareaAutosize} resize="none" mt="5" placeholder="Create a new post..." {...register("text", {required: true})}/>
    </form>
</Box>
}

export default function Forum() {
    const { posts, isLoading } = usePosts();
    if(isLoading) return "Loading"
  return (
    <>
    <NewPost />
    <PostsLists posts={posts} />
    </>
  );
}
