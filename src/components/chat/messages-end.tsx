"use client";

import { type Message } from 'ai';
import { useRef, useEffect } from "react";

interface Props {
  messages: Message[]
}

export default function ChatMessagesEnd({ messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (smooth = true) => {
    const behavior = smooth ? "smooth" : "auto";
    messagesEndRef.current?.scrollIntoView({ behavior });
  };
   
  useEffect(() => {
    // 首次加载页面时直接跳到最底部
    scrollToBottom(false);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 依赖于 messages 的更新

  return <div ref={messagesEndRef}></div>;
}
