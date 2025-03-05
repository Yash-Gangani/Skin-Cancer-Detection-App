
import os
import numpy as np
import tensorflow as tf
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model - with error handling
try:
    model_path = "data/skin_cancer_cnn.keras"  # Update path if needed
    model = tf.keras.models.load_model(model_path)
    print(f"Successfully loaded model from {model_path}")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None  # Set to None to handle gracefully later

# Define image size (should match training size)
img_size = 64

# Load label mapping
label_map = {
    0: "akiec",  # Actinic keratoses
    1: "bcc",    # Basal cell carcinoma
    2: "bkl",    # Benign keratosis-like lesions
    3: "df",     # Dermatofibroma
    4: "mel",    # Melanoma
    5: "nv",     # Melanocytic nevi
    6: "vasc"    # Vascular lesions
}

# Reverse mapping for lookup by name
reverse_label_map = {v: k for k, v in label_map.items()}

# Load cancer details from backend's cancer.json
try:
    with open('../../backend/cancers.json', 'r') as f:
        cancer_details = json.load(f)
    print(f"Successfully loaded cancer details - found {len(cancer_details)} entries")
except FileNotFoundError:
    # Fallback if file not found
    print("Cancer details file not found, using empty list")
    cancer_details = []

# Create a dictionary mapping cancer type code to details
cancer_info = {}
for cancer in cancer_details:
    # Extract the code from the name (assuming first word lowercase is the code)
    name_parts = cancer["name"].lower().split()
    if name_parts:
        possible_code = name_parts[0]
        # Check if this matches any of our label_map values
        for code in label_map.values():
            if code in possible_code or possible_code in code:
                cancer_info[code] = {
                    "description": cancer["description"],
                    "treatment": cancer["treatment"],
                    "next_steps": cancer["next_steps"]
                }
                break

print(f"Mapped cancer info for {len(cancer_info)} cancer types")

# Function to preprocess a single image
def preprocess_image(image_data):
    try:
        # Convert image data to numpy array
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            print("Failed to decode image")
            return None
        
        img = cv2.resize(img, (img_size, img_size))
        img = img / 255.0  # Normalize
        img = np.expand_dims(img, axis=0)  # Add batch dimension
        return img
    except Exception as e:
        print(f"Error in preprocessing image: {str(e)}")
        return None

# Adding a root route for testing
@app.route('/', methods=['GET'])
def root():
    return jsonify({'status': 'ok', 'message': 'ML service is running'})

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    # Handle preflight requests for CORS
    if request.method == 'OPTIONS':
        return '', 204
    
    print(f"Received predict request. Files: {list(request.files.keys()) if request.files else 'No files'}")
    
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500
    
    if 'image' not in request.files:
        print("No image file in request")
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    image_data = file.read()
    print(f"Read image data: {len(image_data)} bytes")
    
    # Preprocess the image
    img_array = preprocess_image(image_data)
    
    if img_array is None:
        return jsonify({'error': 'Failed to process image'}), 400
    
    try:
        # Make prediction
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction[0])
        predicted_label = label_map[predicted_class]
        confidence = float(prediction[0][predicted_class])
        
        # Get all class probabilities
        probabilities = {label_map[i]: float(prediction[0][i]) for i in range(len(label_map))}
        
        # Get cancer details
        details = cancer_info.get(predicted_label, {
            "description": "Information not available",
            "treatment": [],
            "next_steps": []
        })
        
        # Prepare response
        response = {
            'prediction': predicted_label,
            'confidence': confidence,
            'details': {
                'cancerType': predicted_label,
                'description': details.get("description", "Information not available"),
                'treatment': details.get("treatment", []),
                'next_steps': details.get("next_steps", [])
            },
            'probabilities': probabilities
        }
        
        print(f"Prediction successful: {predicted_label} with {confidence:.2f} confidence")
        return jsonify(response)
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    model_status = "loaded" if model is not None else "not loaded"
    return jsonify({
        'status': 'ok', 
        'message': 'ML service is running',
        'model_status': model_status
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"Starting ML API server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)  # Set debug=True for development