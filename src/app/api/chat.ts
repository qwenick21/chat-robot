import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function chatStream(messages: any[]) {
    const chatCompletion = await openai.chat.completions.create({
        messages,
        model: "gpt-4o",
        stream: true
    });

    return chatCompletion
}
