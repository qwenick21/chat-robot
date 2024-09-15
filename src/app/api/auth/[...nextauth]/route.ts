
import NextAuth from 'next-auth'
import type { AuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

const authOptions: AuthOptions = {
  // 配置认证提供者
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }