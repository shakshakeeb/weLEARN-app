import { IconButton, Flex } from '@chakra-ui/react'
import { AiFillLike, AiFillDislike, AiOutlineDislike, AiOutlineLike  } from "react-icons/ai"
import { FaComment, FaRegComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
import { useAuth } from '../../hooks/auth';
import { useToggle } from '../../hooks/posts';
import { useToggleDownvote } from '../../hooks/posts';
import { useRemovePost } from '../../hooks/posts';
import { Link } from "react-router-dom";
import { PROTECTED } from '../../lib/routes';
import { useComments } from '../../hooks/comments';

export default function Interactions({post}) {

    // Extract the likes, dislikes, and ID from the post object
    const { likes = [], dislikes = [], id, uid } = post;
  
    // Use the useAuth hook to get the current user and isLoading state
    const {user, isLoading: userLoading } = useAuth();
  
    // Determine if the current user has liked or disliked the post
    const isLiked = likes.includes(user?.id)
    const isDisliked = dislikes.includes(user?.id)

  
    // Use the useToggle and useToggleDownvote hooks to create toggle functions for liking and disliking the post
    const { toggle, isLoading: likeLoading } = useToggle({isLiked, id, uid: user?.id, });
    const { toggleDownvote, isLoading: dislikeLoading } = useToggleDownvote({isDisliked, id, uid: user?.id, });
    const { comments, isLoading: commentsLoading } = useComments(id);
    const { removePost, isLoading: removeLoading} = useRemovePost(id);
    
    
  
    // Define a function to handle a user's like or unlike action
    const handleLike = () => {
      if (isLiked) { // If the user has already liked the post, toggle the like off
        toggle();
      } else { // If the user has not yet liked the post
        toggle(); // Toggle the like on
        if (isDisliked) { // If the user has previously disliked the post, toggle the dislike off
          toggleDownvote();
        }
      }
    };
  
    // Define a function to handle a user's dislike or undislike action
    const handleDislike = () => {
      if (isDisliked) { // If the user has already disliked the post, toggle the dislike off
        toggleDownvote();
      } else { // If the user has not yet disliked the post
        toggleDownvote(); // Toggle the dislike on
        if (isLiked) { // If the user has previously liked the post, toggle the like off
          toggle();
        }
      }
    };
  
    return (
      <Flex p="2">
        <Flex alignItems="center">
          <IconButton
            onClick={handleLike} // Call the handleLike function when the button is clicked
            isLoading={likeLoading || userLoading} // Show a loading spinner if the like action is being processed
            size="md"
            colorScheme="red"
            variant="ghost"
            icon={isLiked ? <AiFillLike /> : <AiOutlineLike /> } // Show the filled like icon if the user has already liked the post
            isRound
            isDisabled={isDisliked} // Disable the like button if the user has already disliked the post
          />
          {likes.length}
        </Flex>
  
        {/* Render the dislike button */}
        <Flex alignItems="center">
          <IconButton
            onClick={handleDislike} // Call the handleDislike function when the button is clicked
            isLoading={dislikeLoading || userLoading} // Show a loading spinner if the dislike action is being processed
            size="md"
            colorScheme="red"
            variant="ghost"
            icon={isDisliked ? <AiFillDislike /> : <AiOutlineDislike /> } // Show the filled dislike icon if the user has already disliked the post
            isRound
            isDisabled={isLiked} // Disable the dislike button if the user has already liked the post
          />
          {dislikes.length}
        </Flex>

        <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          isLoading={commentsLoading}
          size="md"
          colorScheme="blue"
          variant="ghost"
          icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
          isRound
        />
        {comments?.length}
      </Flex>
      {!userLoading && user.id === uid && (
      <IconButton
        ml="auto"
        onClick={removePost}
        isLoading={removeLoading}
        size="md"
        colorScheme="red"
        variant="ghost"
        icon={<MdDelete />}
        />
        )}
      </Flex>
    );
  }
  
  
