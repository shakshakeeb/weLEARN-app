import Post from "../../post";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { usePost } from "../../../hooks/posts";
import NewComment from "../../pages/comments/NewComment";
import CommentList from "./CommentList";

export default function Comments() {
    const { id } = useParams();
    const { post, isLoading } = usePost(id);

    if(isLoading) return "Loading"


  return (
    <Box align="center">
        <Post  post={post}/>
        <NewComment post={post} />
        <CommentList post={post} />
    </Box>
  );
}
