import numpy as np
import tensorflow as tf
import cv2
import os

# Load the trained model
model_path = "data/skin_cancer_cnn.keras"  # Update if saved elsewhere
model = tf.keras.models.load_model(model_path)

# Define image size (should match training size)
img_size = 64  

# Load label mapping (update based on training)
label_map = {
    0: "akiec",  # Actinic keratoses
    1: "bcc",    # Basal cell carcinoma
    2: "bkl",    # Benign keratosis-like lesions
    3: "df",     # Dermatofibroma
    4: "mel",    # Melanoma
    5: "nv",     # Melanocytic nevi
    6: "vasc"    # Vascular lesions
}

# Directory containing test images
test_dir = r"data/test"

# Function to preprocess a single image
def preprocess_image(img_path):
    img = cv2.imread(img_path)
    if img is None:
        print(f"Error loading image: {img_path}")
        return None
    img = cv2.resize(img, (img_size, img_size))
    img = img / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Predict on all test images
for filename in os.listdir(test_dir):
    img_path = os.path.join(test_dir, filename)
    img_array = preprocess_image(img_path)

    if img_array is not None:
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)  # Get highest probability class
        predicted_label = label_map[predicted_class]  # Converting index to class name
        
        print(f"Image: {filename} --> Predicted Skin Cancer Type: {predicted_label}")