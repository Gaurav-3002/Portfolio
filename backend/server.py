from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
import random
import time
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS with specific settings
CORS(app, 
     origins=['http://localhost:3000', 'http://127.0.0.1:3000'],
     allow_headers=['Content-Type', 'Authorization'],
     methods=['GET', 'POST', 'OPTIONS'])

# Enhanced AI responses with more contextual information
AI_RESPONSES = {
    'skills': [
        "Gaurav is skilled in Python, Java, React, Next.js, TypeScript, Node.js, MongoDB, MySQL, and machine learning. He's also experienced with Docker and Git.",
        "His technical expertise includes full-stack development with modern frameworks like Next.js and React, backend development with Python and Java, and database management with MongoDB and MySQL.",
        "Gaurav has strong proficiency in Python for machine learning projects, JavaScript/TypeScript for web development, and DevOps tools like Docker for containerization."
    ],
    'projects': [
        "Gaurav has worked on several impressive projects including a Crop & Fertilizer Recommendation System using machine learning, a Weather Prediction System, and this beautiful Dynamic Portfolio Website built with Next.js.",
        "His projects showcase his expertise in machine learning (crop recommendation system), data science (weather prediction), and modern web development (this portfolio with AI integration).",
        "Notable projects include ML-based agricultural solutions, weather forecasting systems, and full-stack web applications with advanced features like AI chatbots."
    ],
    'experience': [
        "Gaurav is an aspiring software engineer with hands-on experience in full-stack development, machine learning, and modern web technologies. He's completed certifications in Python, Flask, Git, and API development.",
        "He has practical experience building production-ready applications, implementing AI/ML solutions, and working with modern development tools and frameworks.",
        "His experience spans from machine learning model development to full-stack web applications, showcasing versatility in both data science and web development domains."
    ],
    'contact': [
        "You can reach Gaurav at gauravkrbkj@gmail.com or through the contact form on this website. He's currently available for work opportunities and open to discussing new projects.",
        "Gaurav is based in Bhubaneswar, India, and is actively looking for software engineering opportunities. Feel free to connect with him via email or LinkedIn.",
        "For collaboration or job opportunities, you can contact Gaurav through his email gauravkrbkj@gmail.com. He's passionate about technology and always interested in innovative projects."
    ],
    'education': [
        "Gaurav is studying at KIIT University in Bhubaneswar, where he's developing his skills in computer science and software engineering.",
        "He's currently pursuing his education at KIIT University while actively building his portfolio through practical projects and certifications.",
        "As a student at KIIT University, Gaurav combines academic learning with hands-on project development to build a strong foundation in software engineering."
    ],
    'default': [
        "I'm Gaurav Kumar's AI assistant! I can help you learn about his skills in Python, Java, React, and more. What would you like to know?",
        "Hi! I can provide information about Gaurav's technical skills, projects, experience, and how to contact him. What interests you most?",
        "I'm here to help you learn about Gaurav's background in software development, machine learning, and web technologies. Feel free to ask anything!",
        "Hello! I can assist with questions about Gaurav's programming skills, project portfolio, education, or professional experience. What would you like to explore?"
    ]
}

def get_contextual_response(question_lower, original_question):
    """Get a contextual response based on keywords in the question"""
    
    # Email handling - process actual email drafting
    if original_question.lower().startswith('email:'):
        return process_email_request(original_question)
    
    # Skills-related keywords
    if any(keyword in question_lower for keyword in ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'python', 'java', 'react', 'next']):
        return random.choice(AI_RESPONSES['skills'])
    
    # Project-related keywords
    if any(keyword in question_lower for keyword in ['project', 'work', 'portfolio', 'application', 'system', 'website', 'crop', 'weather', 'machine learning', 'ml']):
        return random.choice(AI_RESPONSES['projects'])
    
    # Experience-related keywords
    if any(keyword in question_lower for keyword in ['experience', 'background', 'career', 'professional', 'developer', 'engineer', 'job', 'certification']):
        return random.choice(AI_RESPONSES['experience'])
    
    # Contact-related keywords
    if any(keyword in question_lower for keyword in ['contact', 'reach', 'email', 'hire', 'available', 'opportunity', 'collaborate']):
        return random.choice(AI_RESPONSES['contact'])
    
    # Education-related keywords
    if any(keyword in question_lower for keyword in ['education', 'study', 'university', 'kiit', 'student', 'degree', 'academic']):
        return random.choice(AI_RESPONSES['education'])
    
    # Default response
    return random.choice(AI_RESPONSES['default'])

def process_email_request(email_request):
    """Process email drafting request"""
    try:
        # Parse email request (format: "email: subject | body")
        email_content = email_request[6:].strip()  # Remove "email:"
        parts = email_content.split('|')
        
        if len(parts) != 2:
            return "Please format your email request as: 'email: subject | body'"
        
        subject = parts[0].strip()
        body = parts[1].strip()
        
        if not subject or not body:
            return "Please provide both subject and body for the email request."
        
        # Format the email response
        return f"""Email drafted successfully! 📧

**Subject:** {subject}

**Body:** {body}

The email has been formatted and is ready to send to Gaurav Kumar at gauravkrbkj@gmail.com"""
        
    except Exception as e:
        return "Sorry, there was an error processing your email request. Please try again with format: 'email: subject | body'"

@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    # Handle preflight requests
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        # Add logging for debugging
        logger.info(f"Received request from: {request.remote_addr}")
        logger.info(f"Request headers: {dict(request.headers)}")
        
        # Validate request
        if not request.is_json:
            logger.error("Request is not JSON")
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.json
        logger.info(f"Request data: {data}")
        
        if not data or 'question' not in data:
            logger.error("Missing 'question' field in request")
            return jsonify({"error": "Missing 'question' field in request"}), 400
            
        question = data['question'].strip()
        if not question:
            logger.error("Question cannot be empty")
            return jsonify({"error": "Question cannot be empty"}), 400
            
        session_id = data.get('sessionId', 'default')
        
        logger.info(f"Processing question from session {session_id}: {question[:50]}...")
        
        # Simulate processing time for realism
        time.sleep(random.uniform(0.5, 1.5))
        
        # Get contextual response
        question_lower = question.lower()
        response = get_contextual_response(question_lower, question)
        
        logger.info(f"Generated response: {response[:50]}...")
        
        result = {
            "answer": response,
            "sessionId": session_id,
            "timestamp": time.time()
        }
        
        # Add CORS headers explicitly
        response_obj = jsonify(result)
        response_obj.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response_obj.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response_obj.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        
        return response_obj
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        error_response = jsonify({
            "error": "Internal server error",
            "message": "Please try again later"
        })
        error_response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        return error_response, 500

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "model_loaded": True,
        "version": "1.0.0",
        "timestamp": time.time()
    })

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "service": "Gaurav Kumar's AI Assistant",
        "status": "running",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/api/health"
        },
        "usage": {
            "chat": "POST /api/chat with {'question': 'your question', 'sessionId': 'optional-session-id'}",
            "email": "Use 'email: subject | body' format for email drafting"
        }
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Method not allowed"}), 405

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    logger.info("Starting Gaurav Kumar's AI Assistant Server...")
    app.run(host="0.0.0.0", port=8001, debug=True)