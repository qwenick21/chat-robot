"use client";

import ChatMessages from "./messages";
import ChatMessagesEnd from "./messages-end";
import ChatInput from "./input";
import { useChat } from "ai/react";
import { type Message } from 'ai';

interface Props {
  roomId: number
  initialMessages: Message[]
}

export function ChatInterface({ roomId, initialMessages }: Props) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ initialMessages, body: { roomId } });

  const sendMessage = () => {
    if (input.trim()) handleSubmit();
  };

  return (
    <div className="flex flex-col p-4">
      <ChatMessages messages={messages} />
      <ChatMessagesEnd messages={messages} />
      <ChatInput
        inputValue={input}
        setInputValue={handleInputChange}
        sendMessage={sendMessage}
      />
    </div>
  );
}
