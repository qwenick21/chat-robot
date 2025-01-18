import { openai } from '@ai-sdk/openai'
import { streamText, convertToCoreMessages, type Message } from 'ai'
import { saveChatMessagesData } from "@/lib/data"
import { checkRoomAuth } from '@/lib/auth'

export const runtime = 'edge';
export const preferredRegion = ['hnd1'];

export async function POST(req: Request) {
    const { messages, roomId } = await req.json()
    if (!await checkRoomAuth(roomId)) {
      return new Response(
        'Access denied: You do not have permission to access this chat room.',
        { status: 403 }
      );
    }

    saveChatMessagesData(roomId, messages.at(-1));

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: convertToCoreMessages(messages),
      onStepFinish(event) {
        const resText = event.text
        const resMessages: Message = { role: "assistant", content: resText, id: roomId }
        saveChatMessagesData(roomId, resMessages);
      },
    })

    return result.toDataStreamResponse()
}    