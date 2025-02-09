from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import io

app = Flask(__name__)

# Load the trained CNN model
model = tf.keras.models.load_model("skin_cancer_cnn_model.keras")
class_labels =  ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"]
# Image Preprocessing Function
def preprocess_image(image):
    image = Image.open(io.BytesIO(image))
    image = image.resize((128, 128))  # Resize to match model input
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    image = file.read()
    processed_image = preprocess_image(image)

    # Get Prediction
    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction)
    
    response = {
        "predicted_class": class_labels[predicted_class],
        "confidence": float(prediction[0][predicted_class])
    }
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
