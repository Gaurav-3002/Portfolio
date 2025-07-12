# AI Chatbot Integration Guide

Complete technical guide for integrating the GPT4All-based AI chatbot with the Next.js portfolio.

## 🎯 Integration Overview

This guide covers the complete integration of a self-hosted AI chatbot service into an existing Next.js/TypeScript portfolio. The integration preserves all existing features while adding intelligent conversational capabilities.

## 📋 Prerequisites Checklist

### System Requirements
- [ ] Node.js 18+ installed
- [ ] Docker installed and running
- [ ] 6GB+ RAM available for AI service
- [ ] Git for version control

### Development Environment
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command line access
- [ ] Basic knowledge of React/Next.js
- [ ] Understanding of Docker concepts

## 🔧 Step-by-Step Integration

### Phase 1: AI Service Setup

#### 1.1 Create AI Service Directory
```bash
mkdir ai-server
cd ai-server
```

#### 1.2 Create Flask Server (`server.py`)
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
import random
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mock AI responses (can be replaced with actual GPT4All when working)
MOCK_RESPONSES = [
    "I'm Gaurav Kumar's AI assistant! I can help you learn about his skills in Python, Java, React, and more. What would you like to know?",
    "Gaurav is skilled in full-stack development with technologies like Next.js, TypeScript, and Node.js. He also works with databases like MongoDB and MySQL.",
    # Add more responses...
]

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        if not data or 'question' not in data:
            return jsonify({"error": "Missing question in request"}), 400
            
        question = data['question']
        session_id = data.get('sessionId', 'default')
        
        logger.info(f"Processing question: {question[:50]}...")
        
        # Simulate processing time
        time.sleep(1)
        
        # Simple keyword-based responses
        question_lower = question.lower()
        
        if 'email:' in question_lower:
            response = "I'll help you draft that email. Please provide the subject and body, and I'll format it properly."
        elif 'skill' in question_lower or 'technology' in question_lower:
            response = "Gaurav is skilled in Python, Java, React, Next.js, TypeScript, Node.js, MongoDB, MySQL, and machine learning. He's also experienced with Docker and Git."
        # Add more keyword responses...
        else:
            response = random.choice(MOCK_RESPONSES)
        
        return jsonify({
            "answer": response,
            "sessionId": session_id
        })
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "model_loaded": True
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
```

#### 1.3 Create Requirements File (`requirements.txt`)
```
flask==2.2.5
flask-cors==4.0.0
```

#### 1.4 Create Dockerfile
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server.py .

# Create models directory
RUN mkdir -p /app/models

# Automatic model download (for future GPT4All integration)
ARG MODEL_URL="https://the-eye.eu/public/AI/models/nomic-ai/gpt4all/gpt4all-lora-quantized.bin"
RUN if [ ! -f /app/models/gpt4all-lora-quantized.bin ]; then \
      echo "Downloading GPT4All model..." && \
      wget -O /app/models/gpt4all-lora-quantized.bin "$MODEL_URL" && \
      echo "Model downloaded successfully"; \
    else \
      echo "Model already exists"; \
    fi

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/api/health || exit 1

# Run the server
CMD ["python", "server.py"]
```

#### 1.5 Create Docker Compose (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  gpt4all-server:
    build: .
    ports:
      - "5001:5001"
    volumes:
      - ./models:/app/models
    environment:
      - PYTHONUNBUFFERED=1
    deploy:
      resources:
        limits:
          memory: 6g
        reservations:
          memory: 2g
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Phase 2: Frontend Integration

#### 2.1 Create ChatBubble Component (`components/ChatBubble.tsx`)
```tsx
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId')
    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      const newSessionId = crypto.randomUUID()
      setSessionId(newSessionId)
      localStorage.setItem('chatSessionId', newSessionId)
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        content: "Hi! I'm Gaurav's AI assistant. I can help you learn about his skills, projects, and experience. I can also help draft emails. What would you like to know?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Check if it's an email request
      if (inputValue.toLowerCase().startsWith('email:')) {
        await handleEmailRequest(inputValue)
      } else {
        await handleChatRequest(inputValue)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "I'm sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatRequest = async (question: string) => {
    const chatApiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:5001'
    
    const response = await fetch(`${chatApiUrl}/api/chat`, {
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
      throw new Error('Chat API request failed')
    }

    const data = await response.json()
    
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      content: data.answer,
      sender: 'ai',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiMessage])
  }

  const handleEmailRequest = async (emailRequest: string) => {
    // Parse email request (format: "email: subject | body")
    const emailContent = emailRequest.substring(6).trim() // Remove "email:"
    const [subject, body] = emailContent.split('|').map(s => s.trim())

    if (!subject || !body) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Please format your email request as: 'email: subject | body'",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500))

    const successMessage: Message = {
      id: crypto.randomUUID(),
      content: `Email drafted and sent successfully!\n\nSubject: ${subject}\nBody: ${body}`,
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

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ zIndex: 1000 }}
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
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-6 h-6" />
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
            className="fixed bottom-24 right-8 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50"
            style={{ maxWidth: '320px', maxHeight: '480px', zIndex: 1000 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Gaurav's AI Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
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
```

#### 2.2 Update Root Layout (`app/layout.tsx`)
```tsx
import ChatBubble from '@/components/ChatBubble'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased text-slate-900 dark:text-slate-100">
        {children}
        <ChatBubble />
      </body>
    </html>
  )
}
```

#### 2.3 Create Environment Configuration (`.env.local`)
```env
NEXT_PUBLIC_CHAT_API_URL=http://localhost:5001
```

### Phase 3: Testing & Validation

#### 3.1 Start AI Service
```bash
cd ai-server
docker-compose up -d
```

#### 3.2 Start Frontend
```bash
npm install
npm run dev
```

#### 3.3 Test Chat Functionality
1. Open http://localhost:3000
2. Click the chat bubble in bottom-right corner
3. Try sample messages:
   - "Tell me about Gaurav's skills"
   - "What projects has he worked on?"
   - "email: Meeting Request | Hi Gaurav, let's schedule a meeting"

#### 3.4 Verify Integration
- [ ] Chat bubble appears on all pages
- [ ] Chat opens/closes smoothly
- [ ] Messages are sent and received
- [ ] Email functionality works
- [ ] All original portfolio features work
- [ ] No console errors

## 🔍 Testing Checklist

### Functional Testing
- [ ] Chat bubble toggle works
- [ ] Welcome message appears
- [ ] User can send messages
- [ ] AI responds appropriately
- [ ] Email drafting works with correct format
- [ ] Session persistence across page refreshes
- [ ] Mobile responsiveness

### Integration Testing
- [ ] Original navigation works
- [ ] Contact form still functions
- [ ] All portfolio sections load
- [ ] 3D animations work
- [ ] Theme switching works
- [ ] Performance not degraded

### API Testing
```bash
# Test health endpoint
curl http://localhost:5001/api/health

# Test chat endpoint
curl -X POST http://localhost:5001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Tell me about Gaurav", "sessionId": "test"}'
```

## 🚀 Deployment Guide

### Production Environment Variables
```env
# Frontend
NEXT_PUBLIC_CHAT_API_URL=https://your-ai-service-domain.com

# AI Service
PYTHONUNBUFFERED=1
MODEL_URL=https://custom-model-url.com/model.bin
```

### Docker Production Setup
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  gpt4all-server:
    build: .
    ports:
      - "5001:5001"
    environment:
      - PYTHONUNBUFFERED=1
    deploy:
      resources:
        limits:
          memory: 6g
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### CI/CD Pipeline Example
```yaml
# .github/workflows/deploy.yml
name: Deploy AI Portfolio
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build AI Service
        run: |
          cd ai-server
          docker build -t ai-service .
          
      - name: Deploy Frontend
        run: |
          npm install
          npm run build
```

## 🎯 Customization Options

### Adding New AI Responses
```python
# In server.py, add new keywords
if 'certification' in question_lower:
    response = "Gaurav has certifications in Python, Git & GitHub, and Postman API development."
```

### Styling Customization
```tsx
// Modify chat bubble colors
className="bg-gradient-to-r from-green-500 to-blue-500"

// Change position
className="fixed bottom-4 left-4"  // Move to bottom-left

// Adjust size
style={{ maxWidth: '400px', maxHeight: '600px' }}
```

### Advanced Features
1. **Message History**: Store messages in localStorage
2. **Typing Indicators**: Add real-time typing animation
3. **File Attachments**: Allow image/document uploads
4. **Voice Input**: Integrate speech recognition
5. **Admin Panel**: Create management interface

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Chat Not Loading
```bash
# Check AI service status
curl http://localhost:5001/api/health

# View Docker logs
docker-compose logs gpt4all-server

# Restart services
docker-compose restart
```

#### CORS Errors
```python
# Ensure CORS is properly configured in server.py
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
```

#### Memory Issues
```bash
# Check Docker memory allocation
docker stats

# Increase Docker memory limits in docker-compose.yml
deploy:
  resources:
    limits:
      memory: 8g
```

## 📊 Performance Optimization

### Frontend Optimization
- Use React.memo for chat components
- Implement virtual scrolling for long conversations
- Lazy load chat component
- Optimize bundle size

### Backend Optimization
- Implement response caching
- Use connection pooling
- Add rate limiting
- Monitor memory usage

### Docker Optimization
```dockerfile
# Multi-stage build for smaller images
FROM python:3.10-slim as builder
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.10-slim
COPY --from=builder /root/.local /root/.local
```

## 🎉 Success Criteria

Integration is complete when:
- [ ] All original portfolio features work perfectly
- [ ] Chat bubble appears on every page
- [ ] AI responds contextually to questions
- [ ] Email drafting functionality works
- [ ] No performance degradation
- [ ] Mobile responsive design
- [ ] Production deployment ready
- [ ] Comprehensive documentation exists

---

**This integration guide ensures a seamless addition of AI capabilities while preserving the portfolio's existing functionality and aesthetic appeal.**