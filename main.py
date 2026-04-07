from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from services.model_service import model_instance

app = FastAPI(
    title="Waste Sorting API",
    description="A beginner-friendly FastAPI application for image classification.",
    version="1.0.0"
)

@app.get("/health")
def health_check():
    """
    Health check endpoint. Useful for Load Balancers and Kubernetes probes.
    """
    return {"status": "healthy", "model_loaded": True}

@app.post("/predict")
async def predict_waste(image: UploadFile = File(...)):
    """
    Accepts an uploaded image and returns the predicted waste class.
    """
    # 1. Validate the file type
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        # 2. Read the image bytes asynchronously
        image_bytes = await image.read()

        # 3. Pass the bytes to the service layer for prediction
        result = model_instance.predict(image_bytes)

        # 4. Return the result in JSON format
        return JSONResponse(content={
            "filename": image.filename,
            "prediction": result["predicted_class"],
            "confidence": result["confidence"]
        })

    except Exception as e:
        # Log the error in a real app; here we just return a 500 error
        raise HTTPException(status_code=500, detail=str(e))
