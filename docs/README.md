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

## 🔧 Development

### **Available Scripts**

#### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
npm run type-check # TypeScript validation
```

#### Backend
```bash
python server.py # Start Flask development server
```

### **Adding New Content**

#### Add New Skill
```bash
cd shared/scripts
node add-skill.js
```

#### Update Projects
Edit `frontend/data/projects.json`:
```json
{
  "id": 5,
  "title": "New Project",
  "description": "Project description",
  "technologies": ["React", "Node.js"],
  "featured": true
}
```

#### Modify AI Responses
Edit `backend/server.py` in the `AI_RESPONSES` dictionary.

## 🚀 Deployment

### **Frontend Deployment (Vercel/Netlify)**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy automatically

### **Backend Deployment (Docker)**
```bash
cd backend
docker build -t portfolio-ai .
docker run -p 8001:8001 portfolio-ai
```

### **Production Considerations**
- Use environment variables for configuration
- Implement proper CORS policies
- Set up SSL/HTTPS
- Monitor AI service memory usage
- Configure health checks

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🔍 Testing

### **Manual Testing**
- All portfolio sections load correctly
- AI chat functionality works
- Email drafting feature functions
- Responsive design on all devices
- Dark/light mode switching

### **API Testing**
```bash
# Test AI health
curl http://localhost:8001/api/health

# Test chat functionality
curl -X POST http://localhost:8001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Tell me about Gaurav", "sessionId": "test"}'
```

## 🎯 Performance

### **Optimization Features**
- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Built-in bundle analyzer
- **Lazy Loading**: Deferred loading of non-critical components
- **Caching**: Efficient caching strategies

### **Core Web Vitals**
- **LCP**: Optimized with image preloading
- **FID**: Minimized with efficient event handlers
- **CLS**: Prevented with proper sizing

## 🔒 Security

- **Input Validation**: Sanitized user inputs
- **CORS Configuration**: Proper cross-origin policies
- **Error Handling**: Secure error messages
- **Rate Limiting**: API request limiting (production)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Gaurav Kumar**
- **Email**: gauravkrbkj121@gmail.com
- **Location**: Bhubaneswar, India
- **University**: KIIT University
- **GitHub**: Check repository for latest code

---

## 🏆 Achievements

This portfolio demonstrates:
- **Modern Web Development**: Latest Next.js 15 with TypeScript
- **AI Integration**: Self-hosted chatbot with contextual responses
- **Advanced Animations**: Framer Motion and Three.js implementation
- **Professional Design**: Industry-standard UI/UX practices
- **Full-stack Capabilities**: Frontend + Backend + AI integration
- **Production Ready**: Docker deployment and monitoring

**Built with ❤️ by Gaurav Kumar** | *Showcasing the future of web development*