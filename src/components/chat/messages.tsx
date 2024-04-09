import { Message } from "@/lib/type";

export default function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col flex-grow overflow-auto p-3 mb-5 space-y-2 whitespace-pre-wrap">
      {messages.map((msg, index) => (
        <div key={index} className="p-2 rounded-lg">
          <div className="font-bold">{msg.role}</div>
          {msg.content}
        </div>
      ))}
    </div>
  );
}
