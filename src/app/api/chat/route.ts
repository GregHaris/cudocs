import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// AIML API configuration
const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.AIML_API_KEY;

if (!apiKey) {
  throw new Error("Missing AIML_API_KEY in environment variables");
}

const api = new OpenAI({ apiKey, baseURL });

// System prompt for CUDOCS assistant
const SYSTEM_PROMPT = `
You are CUDOCS, an AI assistant specialized in CUDOS documentation and development.
Your purpose is to help developers understand CUDOS concepts, navigate documentation, and solve technical challenges.
Always provide clear, accurate information and include relevant documentation links when possible.
Base your responses on official CUDOS documentation and best practices.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    const userPrompt = messages.map((m) => m.content).join("\n");

    const completion = await api.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices?.[0]?.message?.content || "No response";
    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
