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
/app/
├── backend/                     # Flask AI Service
│   ├── server.py               # Main Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── Dockerfile             # Container configuration
│   └── backend_test.py        # API testing utilities
│
├── frontend/                   # Next.js Application
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with AI chat
│   │   ├── page.tsx           # Homepage sections
│   │   ├── globals.css        # Global styles & animations
│   │   └── api/chat/          # API route for AI communication
│   │
│   ├── components/            # React Components
│   │   ├── ChatBubble.tsx     # AI Assistant Interface
│   │   ├── Navigation.tsx     # Portfolio navigation
│   │   ├── ProfileIntro.tsx   # Hero section
│   │   ├── AboutSection.tsx   # About & highlights
│   │   ├── ProjectsSection.tsx # Project showcase
│   │   ├── SkillsSection.tsx  # Skills matrix
│   │   ├── CertificationsSection.tsx # Achievements
│   │   ├── ContactSection.tsx # Contact form
│   │   ├── Footer.tsx         # Footer section
│   │   ├── AnimatedBackground.tsx # 3D particle system
│   │   └── ErrorBoundary.tsx  # Error handling
│   │
│   ├── data/                  # JSON Data Files
│   │   ├── projects.json      # Project information
│   │   ├── skills.json        # Technical skills
│   │   └── certifications.json # Professional certifications
│   │
│   ├── public/                # Static Assets
│   │   ├── Self.jpg           # Profile image
│   │   ├── Resume.pdf         # Downloadable resume
│   │   └── humanoid.png       # 3D avatar image
│   │
│   └── Configuration Files
│       ├── package.json       # Dependencies & scripts
│       ├── tailwind.config.ts # Tailwind customization
│       ├── tsconfig.json      # TypeScript configuration
│       └── next.config.js     # Next.js configuration
│
├── shared/                    # Shared Resources
│   ├── images/               # Common images
│   ├── scripts/              # Utility scripts
│   │   └── add-skill.js      # Dynamic skill management
│   └── error-log.js          # Error logging utilities
│
├── docs/                     # Documentation
│   ├── README.md            # This comprehensive guide
│   ├── INTEGRATION_GUIDE.md # AI integration tutorial
│   └── STATUS_REPORT.md     # Current system status
│
└── test_result.md           # Testing documentation
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js 18+** and npm/yarn
- **Python 3.10+** for AI service
- **Git** for version control
- **6GB+ RAM** recommended for AI service

### 1. Clone & Install
```bash
# Clone repository
git clone <repository-url>
cd portfolio-project

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### 2. Environment Setup
```bash
# Frontend environment (if needed)
cd frontend
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Backend runs on port 8001 by default
```

### 3. Start Services
```bash
# Start AI Backend (Terminal 1)
cd backend
python server.py

# Start Frontend (Terminal 2)
cd frontend
npm run dev
```

### 4. Access Application
- **Portfolio**: http://localhost:3000
- **AI Service**: http://localhost:8001
- **Health Check**: http://localhost:8001/api/health

## 🤖 AI Assistant Usage

### **Chat Commands**
- **General Questions**: "Tell me about Gaurav's skills"
- **Project Inquiry**: "What projects has he worked on?"
- **Experience**: "What is his background?"
- **Email Drafting**: "email: Subject | Message body"

### **API Endpoints**
```bash
# Chat with AI
POST http://localhost:8001/api/chat
{
  "question": "Tell me about Gaurav's skills",
  "sessionId": "optional-session-id"
}

# Health Check
GET http://localhost:8001/api/health
```

## 📊 Portfolio Content

### **Featured Projects**
1. **Crop & Fertilizer Recommendation System** - ML-based agricultural optimization
2. **Weather Prediction System** - Advanced forecasting with machine learning
3. **Dynamic Portfolio Website** - This AI-powered portfolio
4. **Task Management System** - Collaborative project management platform

### **Technical Skills**
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Python, Java, Node.js, Flask
- **Databases**: MongoDB, MySQL
- **DevOps**: Docker, Git, GitHub
- **Specialties**: Machine Learning, Full-stack Development

### **Certifications**
- Python Complete Course and Flask Framework (Udemy)
- Git & GitHub Mastery (Udemy)  
- Postman API Expert (Postman Academy)
- GSSOC Contributor (Girl Script Summer of Code)

## 🎨 Design Features

### **Visual Elements**
- **Color Scheme**: Blue-purple gradient theme (#4f46e5 to #8b5cf6)
- **Typography**: Inter + Space Grotesk font pairing
- **Animations**: Framer Motion powered transitions
- **Effects**: Glass morphism, hover animations, particle systems

### **Interactive Components**
- **Skill Cards**: Rotating cards with proficiency bars
- **Project Overlays**: Hover effects with action buttons
- **Particle System**: Mouse-interactive background animation
- **Navigation**: Smooth scrolling with active indicators

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