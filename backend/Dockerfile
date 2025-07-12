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

# Automatic model download
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