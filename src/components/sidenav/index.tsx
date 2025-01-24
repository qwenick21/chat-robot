"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SideNavHeader from "./header";
import SideNavList from "./list";
import GoogleSignin from "./google-signin";
import { ChatRoom } from "@/lib/type";
import {
  addChatRoomData,
  fetchChatRoomData,
  updateChatRoomData,
  deleteChatRoomData,
  fetchPermissionsData,
} from "@/lib/data";
import { useSession } from "next-auth/react";

export default function SideNav() {
  const [links, setLinks] = useState<ChatRoom[]>([]);
  const [permissions, setPermissions] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // 使用 useRouter
  const { data: session } = useSession();

  const fetchPermissions = async () => {
    const email = session?.user?.email;
    if (!email) return;

    const perm = await fetchPermissionsData(email);
    setPermissions(perm);
  };

  const forwardNewChat = (links: ChatRoom[]) => {
    const newChatRoom = links[0]
    newChatRoom && router.push(`/chat/${newChatRoom.id}`)
  }

  const fetchChat = async (hasNewChat = false) => {
    const email = session?.user?.email;
    if (!email) return;
    
    const chatList = await fetchChatRoomData(email);
    hasNewChat && forwardNewChat(chatList);
    setLinks(chatList);
  };

  useEffect(() => {
    fetchPermissions();
    fetchChat();
  }, [session]);

  const addNewChat = async () => {
    const email = session?.user?.email;
    if (!email) return;
    
    await addChatRoomData(email);

    const hasNewChat = true
    await fetchChat(hasNewChat);
  };

  const handleDelete = async (id: number) => {
    await deleteChatRoomData(id);
    await fetchChat();
    if (`/chat/${id}` === pathname) router.push("/");
  };

  const handleEdit = (id: number, isUpate: boolean, name: string) => {
    const updatedLinks = links.map((link) => {
      if (link.id === id) {
        return { ...link, editable: !link.editable };
      }
      return link;
    });
    setLinks(updatedLinks);

    if (isUpate) {
      updateChatRoomData(id, name);
    }
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedLinks = links.map((link) => {
      if (link.id === id) {
        return { ...link, name: e.target.value };
      }
      return link;
    });
    setLinks(updatedLinks);
  };

  return (
    <div className="w-64 h-full shadow-md bg-white fixed flex flex-col">
      {permissions && (
        <>
          <SideNavHeader addNewChat={addNewChat} />
          <SideNavList
            links={links}
            pathname={pathname}
            handleNameChange={handleNameChange}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      <GoogleSignin />
    </div>
  );
}
