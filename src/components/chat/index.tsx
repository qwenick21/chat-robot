"use client";

import ChatMessages from "./messages";
import ChatMessagesEnd from "./messages-end";
import ChatInput from "./input";
import { useChat } from 'ai/react';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const sendMessage = () => {
    if (input.trim()) handleSubmit()
  }

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
