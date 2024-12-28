"use client";

import ChatMessages from "./messages";
import ChatMessagesEnd from "./messages-end";
import ChatInput from "./input";
import { useChat } from "ai/react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { type Message } from 'ai'
import { fetchChatMessagesData } from "@/lib/data"

export function ChatInterface() {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({ initialMessages, body: { roomId } });
  const pathname = usePathname();
  const permissions = useSelector(
    (state: RootState) => state.permissions.value
  );
  
  const fetchChatMessages = async () => {
    const chat_room_id = Number(pathname.replace('/chat/', ''))
    setRoomId(chat_room_id);
    const messages = await fetchChatMessagesData(chat_room_id);
    setInitialMessages(messages);
  }

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const sendMessage = () => {
    if (input.trim()) handleSubmit();
  };

  return (
    <div className="flex flex-col p-4">
      {permissions && (
        <>
          <ChatMessages messages={messages} />
          <ChatMessagesEnd messages={messages} />
          <ChatInput
            inputValue={input}
            setInputValue={handleInputChange}
            sendMessage={sendMessage}
          />
        </>
      )}
    </div>
  );
}
