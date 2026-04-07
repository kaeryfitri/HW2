# Waste Sorting MLOps Demo

This is a beginner-friendly practice project demonstrating how to serve a Machine Learning model using **FastAPI**. It includes structured code, endpoints, and mock model processing for an image-based waste sorting AI.

## Project Structure

```text
waste-sorting-api/
├── main.py                     # Entry point for the FastAPI application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
└── services/
    ├── __init__.py
    └── model_service.py        # Model loading, preprocessing, and prediction logic
```

## Running the Application Locally

1. **Activate a Python environment** (Optional but highly recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the API server**
   ```bash
   uvicorn main:app --reload
   ```
   > The `--reload` flag automatically restarts the server when you change any code.

## Endpoints & Usage

### 1. Health Check
Once running, check if the API is alive:
```bash
curl -X GET http://127.0.0.1:8000/health
```

### 2. Predict endpoint
You can upload an image using a `multipart/form-data` request with `curl`:
```bash
# Create a dummy image for testing if you don't have one
touch test_image.jpg

# Send the request
curl -X POST http://127.0.0.1:8000/predict \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@test_image.jpg"
```

## Future MLOps Enhancements

As you continue learning MLOps, here's how you might evolve this basic setup:

1. **Dockerizing the Service**
   Write a `Dockerfile` to containerize your API:
   ```dockerfile
   FROM python:3.10-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY . .
   EXPOSE 8000
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. **Model Versioning**
   Instead of hardcoding a model file, load models from cloud storage (e.g., S3) or a registry like **MLflow** or **W&B**. Pass a model metadata version along with the API response so clients know which model served the request.

3. **Logging**
   Replace `print` statements with Python's built-in `logging` module. In production, logs should capture inference latencies and any errors to help debug live issues without exposing stack traces to users.

4. **Monitoring (Prometheus & Grafana)**
   Add metrics tracking to endpoints using middleware (e.g., `prometheus-fastapi-instrumentator`). Track:
   * Requests per second
   * Prediction distribution (are we suddenly predicting 'glass' 90% of the time?)
   * 4xx and 5xx error rates

5. **Testing**
   Write tests using `pytest` and `httpx` to verify endpoint reliability. MLOps also requires "Data Testing" checking if incoming images are the required size or format.

Enjoy your journey into MLOps!
