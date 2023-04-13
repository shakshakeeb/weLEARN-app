import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { PROTECTED } from "../../../lib/routes";
import { Link } from "react-router-dom";

export default function Avatar({ user, size = "xl", overrideAvatar = null }) {

  if (!user) {
    return null; // return null or a placeholder image if user is not defined
  }
  const { id, username } = user;
  return (
    <ChakraAvatar
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      name={user.username}
      size={size}
      src={overrideAvatar || user.avatar}
      _hover={{ cursor: "pointer", opacity: "0.8" }}
    />
  );
}
