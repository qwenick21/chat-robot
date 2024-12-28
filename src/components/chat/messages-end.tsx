import { type Message } from 'ai';
import { useRef, useEffect } from "react";

export default function ChatMessagesEnd({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 依赖于 messages 的更新

  return <div ref={messagesEndRef}></div>;
}
