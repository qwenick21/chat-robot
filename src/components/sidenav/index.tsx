"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SideNavHeader from "./header"
import SideNavList from "./list";
import GoogleSignin from "./google-signin";
import { ChatRoom } from "@/lib/type"

export default function SideNav() {
  const [links, setLinks] = useState<ChatRoom[]>([]);
  const pathname = usePathname();
  const router = useRouter(); // 使用 useRouter

  // 新增聊天的函数
  const addNewChat = () => {
    // 使用当前时间戳作为新聊天会话的简单示例ID
    const newChatHref = `/chat/${Date.now()}`;
    router.push(newChatHref)
    const newChat = { name: "New Chat", href: newChatHref, editable: false };
    setLinks(links => [newChat, ...links]);
  };

  const handleDelete = (href: string) => {
    setLinks(links.filter((link) => link.href !== href));
    if (href === pathname) router.push('/')
  };

  const handleEdit = (href: string) => {
    const updatedLinks = links.map((link) => {
      if (link.href === href) {
        return { ...link, editable: !link.editable };
      }
      return link;
    });
    setLinks(updatedLinks);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, href: string) => {
    const updatedLinks = links.map((link) => {
      if (link.href === href) {
        return { ...link, name: e.target.value };
      }
      return link;
    });
    setLinks(updatedLinks);
  };

  return (
    <div className="w-64 h-full shadow-md bg-white fixed flex flex-col">
      <SideNavHeader
        addNewChat={addNewChat}
      />
      <SideNavList
        links={links}
        pathname={pathname}
        handleNameChange={handleNameChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <GoogleSignin/>
    </div>
  );
}
