#!/usr/bin/env python3
"""
Backend API Testing for Gaurav Kumar's Portfolio AI Server
Tests the Flask AI chatbot server endpoints
"""

import requests
import sys
import time
import json
from datetime import datetime

class AIServerTester:
    def __init__(self, base_url="http://localhost:5001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = f"test_session_{int(time.time())}"

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED")
        
        if details:
            print(f"   Details: {details}")
        print()

    def test_health_endpoint(self):
        """Test the health check endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_keys = ['status', 'model_loaded', 'version', 'timestamp']
                has_all_keys = all(key in data for key in expected_keys)
                success = has_all_keys and data['status'] == 'healthy'
                details = f"Status: {response.status_code}, Data: {data}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Health Endpoint", success, details)
            return success
            
        except Exception as e:
            self.log_test("Health Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_home_endpoint(self):
        """Test the home endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_keys = ['service', 'status', 'endpoints', 'usage']
                has_all_keys = all(key in data for key in expected_keys)
                success = has_all_keys and data['status'] == 'running'
                details = f"Status: {response.status_code}, Service: {data.get('service', 'N/A')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Home Endpoint", success, details)
            return success
            
        except Exception as e:
            self.log_test("Home Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_chat_endpoint(self, question, expected_keywords=None):
        """Test the chat endpoint with a specific question"""
        try:
            payload = {
                "question": question,
                "sessionId": self.session_id
            }
            
            headers = {'Content-Type': 'application/json'}
            response = requests.post(f"{self.base_url}/api/chat", 
                                   json=payload, 
                                   headers=headers, 
                                   timeout=15)
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_keys = ['answer', 'sessionId', 'timestamp']
                has_all_keys = all(key in data for key in required_keys)
                
                if has_all_keys:
                    answer = data['answer']
                    # Check if expected keywords are in the response
                    if expected_keywords:
                        keyword_found = any(keyword.lower() in answer.lower() 
                                          for keyword in expected_keywords)
                        success = keyword_found
                        details = f"Question: '{question}', Answer: '{answer[:100]}...', Keywords found: {keyword_found}"
                    else:
                        success = len(answer) > 0
                        details = f"Question: '{question}', Answer: '{answer[:100]}...'"
                else:
                    success = False
                    details = f"Missing required keys. Got: {list(data.keys())}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            test_name = f"Chat - {question[:30]}..."
            self.log_test(test_name, success, details)
            return success
            
        except Exception as e:
            test_name = f"Chat - {question[:30]}..."
            self.log_test(test_name, False, f"Exception: {str(e)}")
            return False

    def test_chat_error_handling(self):
        """Test chat endpoint error handling"""
        test_cases = [
            # Missing question field
            ({}, "Missing question field"),
            # Empty question
            ({"question": ""}, "Empty question"),
            # Invalid JSON (will be handled by requests)
        ]
        
        for payload, description in test_cases:
            try:
                headers = {'Content-Type': 'application/json'}
                response = requests.post(f"{self.base_url}/api/chat", 
                                       json=payload, 
                                       headers=headers, 
                                       timeout=10)
                
                # Should return 400 for bad requests
                success = response.status_code == 400
                details = f"Payload: {payload}, Status: {response.status_code}"
                
                self.log_test(f"Error Handling - {description}", success, details)
                
            except Exception as e:
                self.log_test(f"Error Handling - {description}", False, f"Exception: {str(e)}")

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            # Test OPTIONS request
            response = requests.options(f"{self.base_url}/api/chat", timeout=10)
            success = response.status_code == 200
            
            if success:
                headers = response.headers
                cors_headers = [
                    'Access-Control-Allow-Origin',
                    'Access-Control-Allow-Methods',
                    'Access-Control-Allow-Headers'
                ]
                
                # Check if CORS headers are present (some might be set by Flask-CORS)
                details = f"Status: {response.status_code}, Headers: {dict(headers)}"
            else:
                details = f"Status: {response.status_code}"
                
            self.log_test("CORS Headers", success, details)
            return success
            
        except Exception as e:
            self.log_test("CORS Headers", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting AI Server Backend Tests")
        print(f"Testing server at: {self.base_url}")
        print("=" * 50)
        
        # Basic endpoint tests
        self.test_health_endpoint()
        self.test_home_endpoint()
        
        # Chat functionality tests
        chat_tests = [
            ("What are Gaurav's skills?", ["python", "java", "react", "skill"]),
            ("Tell me about his projects", ["project", "crop", "weather", "portfolio"]),
            ("What is his experience?", ["experience", "developer", "engineer"]),
            ("How can I contact him?", ["contact", "email", "gaurav"]),
            ("Where did he study?", ["education", "university", "kiit"]),
            ("Hello", ["assistant", "help", "gaurav"]),
        ]
        
        for question, keywords in chat_tests:
            self.test_chat_endpoint(question, keywords)
        
        # Error handling tests
        self.test_chat_error_handling()
        
        # CORS tests
        self.test_cors_headers()
        
        # Print summary
        print("=" * 50)
        print(f"📊 Test Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test runner"""
    # Check if server is running on different ports
    possible_urls = [
        "http://localhost:5001",
        "http://127.0.0.1:5001",
        "http://localhost:5000",
        "http://127.0.0.1:5000"
    ]
    
    server_url = None
    for url in possible_urls:
        try:
            response = requests.get(f"{url}/api/health", timeout=5)
            if response.status_code == 200:
                server_url = url
                break
        except:
            continue
    
    if not server_url:
        print("❌ AI Server not found on any expected port")
        print("   Please ensure the AI server is running on port 5001 or 5000")
        return 1
    
    # Run tests
    tester = AIServerTester(server_url)
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())