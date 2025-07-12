'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize session ID
  useEffect(() => {
    if (!isMounted) return
    
    const storedSessionId = localStorage.getItem('chatSessionId')
    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      setSessionId(newSessionId)
      localStorage.setItem('chatSessionId', newSessionId)
    }
  }, [isMounted])

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Add welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && isMounted) {
      const welcomeMessage: Message = {
        id: 'welcome_' + Date.now(),
        content: "Hi! I'm Gaurav's AI assistant. I can help you learn about his skills, projects, and experience. I can also help draft emails. What would you like to know?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, isMounted])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isMounted) return

    const userMessage: Message = {
      id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsLoading(true)

    try {
      // Check if it's an email request
      if (currentInput.toLowerCase().startsWith('email:')) {
        await handleEmailRequest(currentInput)
      } else {
        await handleChatRequest(currentInput)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: 'error_' + Date.now(),
        content: "I'm sorry, I encountered an error. Please try again. Make sure the AI service is running on http://localhost:5001",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatRequest = async (question: string) => {
    // Use the Next.js API route instead of direct AI server connection
    const chatApiUrl = '/api/chat'
    
    const response = await fetch(chatApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        sessionId
      })
    })

    if (!response.ok) {
      throw new Error(`Chat API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    const aiMessage: Message = {
      id: 'ai_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      content: data.answer || 'Sorry, I received an empty response.',
      sender: 'ai',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiMessage])
  }

  const handleEmailRequest = async (emailRequest: string) => {
    // Parse email request (format: "email: subject | body")
    const emailContent = emailRequest.substring(6).trim() // Remove "email:"
    const parts = emailContent.split('|')
    
    if (parts.length !== 2) {
      const errorMessage: Message = {
        id: 'error_' + Date.now(),
        content: "Please format your email request as: 'email: subject | body'",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    const subject = parts[0].trim()
    const body = parts[1].trim()

    if (!subject || !body) {
      const errorMessage: Message = {
        id: 'error_' + Date.now(),
        content: "Please provide both subject and body for the email request.",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    // Simulate email processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const successMessage: Message = {
      id: 'email_' + Date.now(),
      content: `Email drafted successfully!\n\n📧 Subject: ${subject}\n\n📝 Body: ${body}\n\nThe email has been formatted and is ready to send to Gaurav Kumar.`,
      sender: 'ai',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, successMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ zIndex: 1000 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-16 right-4 md:bottom-24 md:right-8 w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-96 md:max-h-[480px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
            style={{ zIndex: 1000 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 md:p-4 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Gaurav's AI Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-2 md:p-3 rounded-2xl text-xs md:text-sm whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-2 h-2 md:w-3 md:h-3 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-2 h-2 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 md:p-3 rounded-2xl">
                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 md:p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs md:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Try: "Tell me about Gaurav's skills" or "email: subject | body"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBubble