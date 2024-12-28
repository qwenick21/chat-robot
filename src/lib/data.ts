"use server";

import { sql, db } from "@vercel/postgres";
import { type Message } from 'ai'

export async function fetchPermissionsData(user_email: string) {
   const client = await db.connect();
   try {
      const data = await client.sql`SELECT EXISTS (
                           SELECT 1
                           FROM permissions
                           WHERE user_email = ${user_email})`;
      const { exists } = data.rows[0];
      return exists;
   } finally {
      client.release();
   }   
}

export async function fetchChatRoomData(user_email: string) {
   const client = await db.connect();
   try {
      const data = await client.sql`SELECT id, name
                           FROM chat_rooms
                           WHERE user_email = ${user_email}
                           ORDER BY id DESC`;
      const chatData = data.rows.map((row) => ({
         id: row.id,
         name: row.name,
         editable: false,
      }));
      return chatData;
   } finally {
      client.release();
   }   
}

export async function addChatRoomData(user_email: string) {
  await sql`
   INSERT INTO chat_rooms (name, user_email)
   VALUES ('New Chat', ${user_email})`;
}

export async function updateChatRoomData(id: number, name: string) {
  await sql`
   UPDATE chat_rooms
   SET name = ${name}
   WHERE id = ${id}`;
}

export async function deleteChatRoomData(id: number) {
  await sql`
   DELETE FROM chat_rooms
   WHERE id = ${id}`;
}

export async function fetchChatMessagesData(chat_room_id: number) {
   const client = await db.connect();
   try {
      const data = await client.sql`SELECT role, content
         FROM chat_messages
         WHERE chat_room_id = ${chat_room_id}
         ORDER BY created_at; `;
      const messagesData = data.rows.map(row => ({
         role: row.role,
         content: row.content
      }))
      return messagesData;
   } finally {
      client.release();
   }
}

// 插入聊天記錄
export async function saveChatMessagesData(chat_room_id: number, message: Message) { 
   await sql`
       INSERT INTO chat_messages (chat_room_id, role, content)
       VALUES (${chat_room_id}, ${message.role}, ${message.content})`; 
}
