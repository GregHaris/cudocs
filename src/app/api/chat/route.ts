import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("llama-3.1-70b-versatile"),
    messages,
    system:
      "You are CUDOCS, an AI assistant that helps developers understand CUDOS documentation. Provide clear, accurate answers and include relevant documentation links when possible.",
  })

  return result.toDataStreamResponse()
}

