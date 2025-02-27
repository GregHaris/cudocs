"use client"

import * as React from "react"
import { useChat } from "ai/react"
import type { Message } from "ai"
import { Moon, Sun, ThumbsDown, ThumbsUp, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const INITIAL_MESSAGE: Message = {
  id: "initial-message",
  role: "assistant",
  content:
    "👋 Hi! I'm CUDOCS, your AI guide to CUDOS documentation. Ask me anything about CUDOS development, infrastructure, or ecosystem - I'm here to help you build amazing things!",
}

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [INITIAL_MESSAGE],
    api: "/api/chat", // Ensure it points to the correct API route
  })
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  React.useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8",
        isDarkMode ? "dark" : "",
      )}
    >
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">CUDOCS Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex flex-col animate-fade-in", message.role === "user" ? "items-end" : "items-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {message.content}
                  {isLoading && message.role === "assistant" && message.id === messages[messages.length - 1].id && (
                    <span className="ml-1 animate-pulse">▊</span>
                  )}
                </div>
                {message.role === "assistant" && !isLoading && (
                  <div className="flex items-center mt-2 space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-red-100 dark:hover:bg-red-900">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t dark:border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about CUDOS documentation..."
              className="flex-1 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Thinking..." : "Send"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
