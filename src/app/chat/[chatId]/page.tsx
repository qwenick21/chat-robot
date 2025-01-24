import { ChatInterface } from '@/components/chat'
import { fetchChatMessagesData } from "@/lib/data"
import { checkRoomAuth } from '@/lib/auth'

export default async function Chat({ params }: { params: { chatId: string } }) {
    const { chatId } = await params
    const roomId = Number(chatId);
    if (!await checkRoomAuth(roomId)) return (
        <h2>{`You don't have permission to access this chat room`}</h2>
    )

    const initialMessages = await fetchChatMessagesData(roomId);
    return (
        <ChatInterface roomId={roomId} initialMessages={initialMessages}/>
    )  
}