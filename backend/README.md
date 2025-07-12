# GPT4All AI Server

A Docker-containerized AI chatbot service using GPT4All-Lora quantized model for Gaurav Kumar's portfolio.

## Features

- **GPT4All-Lora Model**: Lightweight 128.9 MB quantized model
- **Automatic Model Download**: Downloads model on first run
- **Docker Containerized**: Easy deployment and scaling
- **CORS Enabled**: Ready for frontend integration
- **Health Checks**: Built-in health monitoring

## Quick Start

### Using Docker Compose (Recommended)

```bash
cd ai-server
docker-compose up -d
```

### Manual Docker Build

```bash
cd ai-server
docker build -t g4a-server:4.43.1 .
docker run -d \
  -p 5001:5001 \
  -v "$(pwd)/models:/app/models" \
  --memory="6g" \
  --name g4a-server \
  g4a-server:4.43.1
```

## API Endpoints

### Chat Endpoint
- **URL**: `POST /api/chat`
- **Body**: 
  ```json
  {
    "question": "Tell me about Gaurav's skills",
    "sessionId": "uuid-string"
  }
  ```
- **Response**:
  ```json
  {
    "answer": "Gaurav is skilled in...",
    "sessionId": "uuid-string"
  }
  ```

### Health Check
- **URL**: `GET /api/health`
- **Response**:
  ```json
  {
    "status": "healthy",
    "model_loaded": true
  }
  ```

## Development

### Local Development
```bash
pip install -r requirements.txt
python server.py
```

### Environment Variables
- `MODEL_URL`: Custom model download URL (optional)
- `PYTHONUNBUFFERED`: Set to 1 for Docker logging

## Model Information

- **Model**: gpt4all-lora-quantized-4.43.1.bin
- **Size**: 128.9 MB
- **Source**: https://gpt4all.io/models/
- **License**: Apache 2.0

## Troubleshooting

### Model Download Issues
If model download fails, manually download:
```bash
mkdir -p models
wget -O models/gpt4all-lora-quantized-4.43.1.bin https://gpt4all.io/models/gpt4all-lora-quantized-4.43.1.bin
```

### Memory Issues
- Minimum 2GB RAM required
- Recommended 6GB for optimal performance
- Adjust Docker memory limits if needed

### Port Conflicts
If port 5001 is in use, change in docker-compose.yml:
```yaml
ports:
  - "5002:5001"  # Use port 5002 instead
```