


import os
import numpy as np
import tensorflow as tf
import cv2
from flask import Flask, request, jsonify
from flask_cors import CORS
import json


#main for developement
# app = Flask(__name__)
# CORS(app)  


#for production
app = Flask(__name__)
CORS(app, origins=["https://skin-cancer-detection-app.onrender.com", "http://localhost:5173",])


try:
    model_path = "data/skin_cancer_cnn.keras"  
    model = tf.keras.models.load_model(model_path)
    print(f"Successfully loaded model from {model_path}")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None  

img_size = 64

label_map = {
    0: "Actinic Keratoses",  # Actinic keratoses
    1: "Basal Cell Carcinoma",    # Basal cell carcinoma
    2: "Benign keratosis-like Nesions",    # Benign keratosis-like lesions
    3: "Dermatofibroma",     # Dermatofibroma
    4: "Melanoma",    # Melanoma
    5: "Melanocytic Nevi",     # Melanocytic nevi
    6: "Vascular Lesions"    # Vascular lesions
}

reverse_label_map = {v: k for k, v in label_map.items()}

try:
    with open('../backend/cancers.json', 'r') as f:
        cancer_details = json.load(f)
    print(f"Successfully loaded cancer details - found {len(cancer_details)} entries")
except FileNotFoundError:
    print("Cancer details file not found, using empty list")
    cancer_details = []

cancer_info = {}
for cancer in cancer_details:
    name_lower = cancer["name"].lower()
    
    if "basal" in name_lower or "bcc" in name_lower or "carcinoma" in name_lower:
        cancer_info["Basal Cell Carcinoma"] = cancer
    elif "actinic" in name_lower or "akiec" in name_lower:
        cancer_info["Actinic Keratoses"] = cancer
    elif "benign" in name_lower or "bkl" in name_lower:
        cancer_info["Benign keratosis-like Nesions"] = cancer
    elif "dermatofibroma" in name_lower or "df" in name_lower:
        cancer_info["Dermatofibroma"] = cancer
    elif "melanoma" in name_lower or "mel" in name_lower:
        cancer_info["Melanoma"] = cancer
    elif "nevi" in name_lower or "melanocytic" in name_lower or "nv" in name_lower:
        cancer_info["Melanocytic Nevi"] = cancer
    elif "vascular" in name_lower or "vasc" in name_lower:
        cancer_info["Vascular Lesions"] = cancer

print(f"Mapped cancer info for {len(cancer_info)} cancer types: {list(cancer_info.keys())}")

def preprocess_image(image_data):
    try:
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            print("Failed to decode image")
            return None
        
        img = cv2.resize(img, (img_size, img_size))
        img = img / 255.0  
        img = np.expand_dims(img, axis=0)  
        return img
    except Exception as e:
        print(f"Error in preprocessing image: {str(e)}")
        return None

@app.route('/', methods=['GET'])
def root():
    return jsonify({'status': 'ok', 'message': 'ML service is running'})

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
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
    
    img_array = preprocess_image(image_data)
    
    if img_array is None:
        return jsonify({'error': 'Failed to process image'}), 400
    
    try:
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction[0])
        predicted_label = label_map[predicted_class]
        confidence = float(prediction[0][predicted_class])
        
        probabilities = {label_map[i]: float(prediction[0][i]) for i in range(len(label_map))}
        
        cancer_details = cancer_info.get(predicted_label)
        if cancer_details:
            response = {
                'prediction': predicted_label,
                'confidence': confidence,
                'details': {
                    'cancerType': cancer_details["name"],
                    'description': cancer_details["description"],
                    'treatment': cancer_details["treatment"],
                    'next_steps': cancer_details["next_steps"]
                },
                'probabilities': probabilities
            }
        else:
            response = {
                'prediction': predicted_label,
                'confidence': confidence,
                'details': {
                    'cancerType': predicted_label,
                    'description': "Information not available",
                    'treatment': [],
                    'next_steps': []
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
        'model_status': model_status,
        'cancer_types': list(cancer_info.keys())
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"Starting ML API server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)  