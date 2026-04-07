# Use an official lightweight Python image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first to leverage Docker layer caching
# (If requirements haven't changed, Docker won't have to reinstall everything)
COPY requirements.txt .

# Install Python dependencies without keeping package caches to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose port 8000, which is where FastAPI will run
EXPOSE 8000

# Start the FastAPI server using Uvicorn when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
