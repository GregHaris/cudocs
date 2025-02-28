import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

const aiml = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: aiml('llama3-8b-8192'),
    system: 'You are a helpful assistant.',
    messages,
    temperature: 0.7,
    maxTokens: 500,
  });

  return result.toDataStreamResponse();
}
