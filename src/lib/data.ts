"use server";

import { sql, db, type VercelPoolClient } from "@vercel/postgres";
import { type Message } from "ai";

async function withDatabase(
  callback: (client: VercelPoolClient) => Promise<any>
) {
  const client = await db.connect();
  try {
    return await callback(client);
  } finally {
    await client.release();
  }
}

export async function fetchPermissionsData(user_email: string) {
  const { exists } = await withDatabase(async (client) => {
    const data = await client.sql`SELECT EXISTS (
                           SELECT 1
                           FROM permissions
                           WHERE user_email = ${user_email})`;
    return data.rows[0];
  });
  return exists;
}

export async function fetchChatRoomPermissions(user_email: string, roomId: number) {
  const chatRooms = await withDatabase(async (client) => {
    const data = await client.sql`SELECT id
                           FROM chat_rooms
                           WHERE user_email = ${user_email}`;
    return data.rows.map((row) => row.id);
  });
  return chatRooms.includes(roomId);
}

export async function fetchChatRoomData(user_email: string) {
  const chatData = await withDatabase(async (client) => {
    const data = await client.sql`SELECT id, name
                           FROM chat_rooms
                           WHERE user_email = ${user_email}
                           ORDER BY id DESC`;
    return data.rows.map((row) => ({
      id: row.id,
      name: row.name,
      editable: false,
    }));
  });
  return chatData;
}

export async function addChatRoomData(user_email: string) {
  await withDatabase(async (client) => {
    await client.sql`
      INSERT INTO chat_rooms (name, user_email)
      VALUES ('New Chat', ${user_email})`;
  });
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
  const messagesData = await withDatabase(async (client) => {
    const data = await client.sql`SELECT role, content
         FROM chat_messages
         WHERE chat_room_id = ${chat_room_id}
         ORDER BY created_at; `;
    return data.rows.map((row) => ({
      role: row.role,
      content: row.content,
      id: `${chat_room_id}`,
    }));
  });
  return messagesData;
}

// 插入聊天記錄
export async function saveChatMessagesData(
  chat_room_id: number,
  message: Message
) {
  await sql`
       INSERT INTO chat_messages (chat_room_id, role, content)
       VALUES (${chat_room_id}, ${message.role}, ${message.content})`;
}
