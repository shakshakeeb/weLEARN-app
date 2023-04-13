import { Box } from "@chakra-ui/react";
import { useComments } from "../../../hooks/comments";

import Chat from "./Chat";

export default function ChatList({chat}){
    const {id } = chat; 
    const {chats, isLoading } = useChats(id);

    if(isLoading) return "Loading";

    return (
        <Box>
          {chats.map((chat) => (
            <Chat key={chat.id} chat={chat} />
          ))}
        </Box>
      );
}