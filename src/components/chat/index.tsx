"use client";

import { useState } from "react";
import { chatStream } from "@/app/api/chat";
import { Message } from "@/lib/type";
import ChatMessages from "./messages";
import ChatMessagesEnd from "./messages-end";
import ChatInput from "./input";

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]); // 假设是聊天信息的数组
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    // 创建一个更新后的消息数组
    const updatedMessages = [
      ...messages,
      { content: inputValue, role: "user" },
    ];

    // 立即更新本地状态
    setMessages(updatedMessages);

    setInputValue("");

    const res = await chatStream(updatedMessages);
    if (!res) return;
    setMessages((messages) => [
      ...messages,
      { content: "", role: "assistant" },
    ]);
    for await (let chunk of res) {
      let { content: contentChar } = chunk.choices[0]?.delta;
      contentChar &&
        setMessages((messages) =>
          messages.map((msg, index) => {
            if (index === messages.length - 1)
              return { ...msg, content: `${msg.content}${contentChar}` };
            return msg;
          })
        );
    }
  };

  return (
    <div className="flex flex-col p-4">
      <ChatMessages messages={messages} />
      <ChatMessagesEnd messages={messages} />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
      />
    </div>
  );
}
