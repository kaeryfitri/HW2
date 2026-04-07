import random
import io
from PIL import Image

# Simulated class names according to the requirements
CLASSES = [
    "paper",
    "plastic",
    "glass",
    "metal",
    "organic waste"
]

class WasteClassificationModel:
    def __init__(self):
        # In a real scenario, you'd load your trained model here
        # e.g., self.model = load_model("path/to/weights.pth")
        print("Model initialized and loaded.")

    def preprocess_image(self, image_bytes: bytes) -> Image.Image:
        """
        Preprocess the uploaded image bytes.
        """
        # Open the image using Pillow
        image = Image.open(io.BytesIO(image_bytes))
        
        # In real-world scenarios, you would resize and normalize the image here:
        # image = image.resize((224, 224))
        # image_tensor = normalize(image)
        
        return image

    def predict(self, image_bytes: bytes) -> dict:
        """
        Predict the waste class from image bytes.
        """
        # 1. Preprocess the image
        _ = self.preprocess_image(image_bytes)
        
        # 2. Run inference (here we simulate inference with random choices)
        predicted_class = random.choice(CLASSES)
        confidence = round(random.uniform(0.60, 0.99), 4)

        return {
            "predicted_class": predicted_class,
            "confidence": confidence
        }

# Instantiate a mock model instance
# Typically instantiated at startup to save time per request
model_instance = WasteClassificationModel()
