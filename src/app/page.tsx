"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { Moon, Sun, ThumbsDown, ThumbsUp, Send, Bot, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "👋 Hi! I'm CUDOCS, your AI guide to CUDOS documentation. Ask me anything about CUDOS development, infrastructure, or ecosystem - I'm here to help you build amazing things!",
}

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [INITIAL_MESSAGE],
  })
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const [isStarted, setIsStarted] = React.useState(false)

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

  if (!isStarted) {
    return (
      <div
        className={cn(
          "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8",
          isDarkMode ? "dark" : "",
        )}
      >
        <div className="max-w-4xl mx-auto pt-12 animate-fade-in">
          <div className="flex justify-end mb-8">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="space-y-8 animate-slide-up">
            <div className="flex items-center gap-3 text-primary">
              <Bot className="h-12 w-12" />
              <h1 className="font-geist text-4xl font-bold">CUDOCS</h1>
            </div>

            <h2 className="font-geist text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Your AI-powered guide to CUDOS development
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl font-inter">
              Get instant, accurate answers to your CUDOS development questions. I'll help you navigate the
              documentation, understand complex concepts, and solve technical challenges faster.
            </p>

            <div className="space-y-4 font-inter">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">I can help you with:</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Understanding CUDOS infrastructure and architecture
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Smart contract development and deployment
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Network interactions and API integrations
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Troubleshooting common development issues
                </li>
              </ul>
            </div>

            <Button size="lg" onClick={() => setIsStarted(true)} className="font-semibold">
              Start Chatting
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8",
        isDarkMode ? "dark" : "",
      )}
    >
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl animate-fade-in">
        <CardHeader className="border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="font-geist text-2xl font-bold text-gray-900 dark:text-white">
                CUDOCS Assistant
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex flex-col animate-fade-in", message.role === "user" ? "items-end" : "items-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 font-inter",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {message.content}
                </div>
                {message.role === "assistant" && (
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
              className="flex-1 dark:bg-gray-700 dark:text-white font-inter"
            />
            <Button type="submit" className="font-semibold">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

