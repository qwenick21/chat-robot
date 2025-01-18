import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { fetchChatRoomPermissions } from "@/lib/data"

const authOptions = {
  // 配置认证提供者
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.AUTH_SECRET,
}

export const { handlers: { GET, POST }, auth } = NextAuth(authOptions)

export async function checkRoomAuth(roomId: number) {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) return false

    const roomPermissions = await fetchChatRoomPermissions(email ,roomId);
    if (!roomPermissions) return false

    return true
}
