import { openai } from '@ai-sdk/openai'
import { streamText, convertToCoreMessages } from 'ai'
import { saveChatMessagesData } from "@/lib/data"
import { type Message } from 'ai';

export const runtime = 'edge';
export const preferredRegion = ['hnd1'];

export async function POST(req: Request) {
    const { messages, roomId } = await req.json()
    saveChatMessagesData(roomId, messages.at(-1));

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: convertToCoreMessages(messages),
      onFinish(event) {
        const resText = event.text
        const resMessages: Message = { role: "assistant", content: resText, id: roomId }
        saveChatMessagesData(roomId, resMessages);
      },
    })

    return result.toDataStreamResponse()
}    