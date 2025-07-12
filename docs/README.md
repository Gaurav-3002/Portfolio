# 🚀 Gaurav Kumar's AI-Powered Portfolio Website

A modern, responsive portfolio website featuring an integrated AI chatbot assistant, built with Next.js 15, TypeScript, and Flask. This portfolio showcases cutting-edge web development with advanced animations, 3D graphics, and intelligent conversational AI.

## ✨ Key Features

### 🎨 **Modern Portfolio Design**
- **Gradient Aesthetics**: Beautiful blue-purple gradient theme throughout
- **Glass Morphism**: Modern glass-effect UI components with backdrop blur
- **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile devices
- **Dark/Light Mode**: Theme switching with smooth transitions
- **3D Animations**: Interactive Three.js particle system and Rive animations
- **Smooth Scrolling**: Framer Motion powered animations and transitions

### 🤖 **AI Chatbot Assistant**
- **Contextual Intelligence**: Answers questions about skills, projects, and experience
- **Email Drafting**: AI-powered email composition with format parsing
- **Session Management**: Persistent conversations with UUID-based sessions
- **Natural Language**: Smart keyword recognition for relevant responses
- **Real-time Chat**: Beautiful chat interface with typing indicators
- **Self-hosted**: Privacy-focused Flask backend with no external AI dependencies

### 📱 **Interactive Components**
- **Dynamic Navigation**: Smooth-scrolling navigation with active section highlighting
- **Project Showcase**: Interactive cards with hover overlays and filtering
- **Skills Matrix**: Animated skill cards with proficiency indicators
- **Certification Gallery**: Professional achievement showcase
- **Contact System**: EmailJS integration for direct communication
- **Error Boundaries**: Graceful error handling with retry mechanisms

## 🛠 Tech Stack

### **Frontend Architecture**
- **Next.js 15.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion 10** - Advanced animations and page transitions
- **Three.js** - 3D graphics and particle systems
- **Rive** - Interactive vector animations
- **Lucide React** - Beautiful icon library

### **AI Backend**
- **Flask 2.2.5** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Custom AI Logic** - Keyword-based contextual responses
- **Session Management** - UUID-based conversation tracking
- **Health Monitoring** - Built-in API health checks

### **Development Tools**
- **ESLint & TypeScript** - Code quality and type safety
- **PostCSS & Autoprefixer** - CSS processing
- **Docker** - Containerized AI service deployment
- **Git** - Version control with organized structure

## 📁 Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with ChatBubble
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ChatBubble.tsx           # AI Assistant Chat Interface
│   ├── Navigation.tsx           # Portfolio navigation
│   ├── ProfileIntro.tsx         # Hero section
│   ├── ContactSection.tsx       # Contact form
│   └── ...                      # Other portfolio components
├── data/                        # JSON data files
│   ├── projects.json            # Project information
│   ├── skills.json              # Skills and technologies
│   └── certifications.json     # Certifications
├── ai-server/                   # AI Service (Docker)
│   ├── server.py               # Flask API server
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile              # Docker configuration
│   ├── docker-compose.yml      # Docker Compose setup
│   └── README.md               # AI service documentation
├── public/                      # Static assets
├── package.json                # Node.js dependencies
├── tailwind.config.ts          # Tailwind configuration
├── .env.local                  # Environment variables
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **Docker** (for AI service)
- **Python 3.10** (if running AI service locally)

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install
# or
yarn install
```

### 2. Environment Setup

Create `.env.local` file:
```env
NEXT_PUBLIC_CHAT_API_URL=http://localhost:5001
```

### 3. Start AI Service

#### Option A: Using Docker (Recommended)
```bash
cd ai-server
docker-compose up -d
```

#### Option B: Local Development
```bash
cd ai-server
pip install -r requirements.txt
python server.py
```

### 4. Start Frontend

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the portfolio!

## 🤖 AI Assistant Usage

### Chat Features
1. **General Questions**: Ask about Gaurav's skills, projects, or experience
   ```
   "Tell me about Gaurav's skills"
   "What projects has he worked on?"
   "What is his experience with React?"
   ```

2. **Email Drafting**: Use the `email:` prefix to draft emails
   ```
   "email: Meeting Request | Hi Gaurav, I'd like to schedule a meeting to discuss a potential project."
   ```

### AI Service API

#### Chat Endpoint
```bash
POST http://localhost:5001/api/chat
Content-Type: application/json

{
  "question": "Tell me about Gaurav's skills",
  "sessionId": "uuid-string"
}
```

#### Health Check
```bash
GET http://localhost:5001/api/health
```

## 🐳 Docker Deployment

### Build AI Service
```bash
cd ai-server
docker build -t gpt4all-server .
```

### Run with Docker Compose
```bash
cd ai-server
docker-compose up -d
```

### Manual Docker Run
```bash
docker run -d \
  -p 5001:5001 \
  -v "$(pwd)/models:/app/models" \
  --memory="6g" \
  --name gpt4all-server \
  gpt4all-server
```

## 🔧 Development

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

#### AI Service
- `python server.py` - Start Flask development server
- `docker-compose up` - Start with Docker
- `docker-compose logs` - View logs

### Environment Variables

#### Frontend (.env.local)
- `NEXT_PUBLIC_CHAT_API_URL` - AI service URL (default: http://localhost:5001)

#### AI Service
- `MODEL_URL` - Custom model download URL (optional)
- `PYTHONUNBUFFERED` - Python logging (Docker)

## 🎨 Customization

### Adding New Chat Responses
Edit `/ai-server/server.py` to add new keyword-based responses:

```python
if 'your_keyword' in question_lower:
    response = "Your custom response here"
```

### Styling the Chat Bubble
Modify `/components/ChatBubble.tsx` for custom styling:

```tsx
// Change chat bubble position
className="fixed bottom-8 right-8"

// Modify chat window size
style={{ maxWidth: '320px', maxHeight: '480px' }}
```

### Adding New Portfolio Sections
1. Create component in `/components/`
2. Add to `/app/page.tsx`
3. Update navigation in `/components/Navigation.tsx`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### AI Service (Any Docker Host)
1. Build Docker image
2. Push to container registry
3. Deploy with 6GB+ memory allocation

### Production Considerations
- Use production WSGI server (gunicorn) for Flask
- Set up proper CORS policies
- Configure SSL/HTTPS
- Monitor memory usage for AI service
- Set up health checks

## 🔍 Troubleshooting

### Common Issues

#### Chat Not Responding
1. Check AI service status: `curl http://localhost:5001/api/health`
2. Verify Docker container: `docker ps`
3. Check logs: `docker-compose logs`

#### Model Download Issues
```bash
# Manual model download
mkdir -p ai-server/models
wget -O ai-server/models/gpt4all-lora-quantized.bin \
  https://the-eye.eu/public/AI/models/nomic-ai/gpt4all/gpt4all-lora-quantized.bin
```

#### Memory Issues
- Ensure Docker has 6GB+ memory allocated
- Close other memory-intensive applications
- Consider using a smaller model if needed

#### CORS Issues
- Verify CORS is enabled in Flask server
- Check browser console for CORS errors
- Ensure correct API URL in environment variables

### Performance Optimization
- Enable production build: `npm run build`
- Optimize Docker image size
- Use CDN for static assets
- Enable gzip compression

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Email**: gauravkrbkj@gmail.com
- **GitHub**: [Gaurav-3002](https://github.com/Gaurav-3002)
- **Portfolio**: [Live Demo](https://gaurav-portfolio.vercel.app)

---

**Built with ❤️ by Gaurav Kumar**

*This portfolio showcases modern web development practices with AI integration, demonstrating full-stack capabilities and innovative technology usage.*