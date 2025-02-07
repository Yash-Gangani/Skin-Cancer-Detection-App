import torch
import torchvision.transforms as transforms
import pandas as pd
from PIL import Image
import torch.nn as nn
import torch.nn.functional as F
from torchvision.models import resnet18, ResNet18_Weights
import os
import numpy as np

# Load metadata file (For some reason it was not working with short path so I used whole path)
metadata_path = r"D:/University/Quarter 5/Studio Engineering/Skin Cancer Detection and Identification Application/ISIC-images/metadata.csv"  # Adjust if needed
metadata_df = pd.read_csv(metadata_path)

# Define class labels
class_names = ['benign', 'malignant']

# Define CNN Model
class SkinDiseaseEnhancedCNN(nn.Module):
    def __init__(self, num_classes):
        super(SkinDiseaseEnhancedCNN, self).__init__()
        self.resnet = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)  # Updated to avoid warning
        self.resnet.fc = nn.Sequential(
            nn.Linear(self.resnet.fc.in_features, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
        )
        self.fc_metadata = nn.Sequential(
            nn.Linear(3, 32),
            nn.ReLU()
        )
        self.fc_combined = nn.Linear(160, num_classes)

    def forward(self, image, metadata):
        image_features = self.resnet(image)  # Shape: [batch_size, 128]
        metadata_features = self.fc_metadata(metadata)  # Shape: [batch_size, 32]
        combined = torch.cat((image_features, metadata_features), dim=1)  # Shape: [batch_size, 160]
        output = self.fc_combined(combined)  # Shape: [batch_size, num_classes]
        return output

# Load trained model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = SkinDiseaseEnhancedCNN(len(class_names)).to(device)
model.load_state_dict(torch.load("enhanced_skin_disease_model.pth", map_location=device))
model.eval()

# Defining image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

# Function to fetch metadata for an image
def get_metadata(image_id):
    row = metadata_df[metadata_df['isic_id'] == image_id]
    if row.empty:
        return torch.randn(1, 3).to(device)

    age = row['age_approx'].values[0] if not pd.isna(row['age_approx'].values[0]) else np.median(metadata_df['age_approx'].dropna())
    site = row['anatom_site_general'].values[0] if not pd.isna(row['anatom_site_general'].values[0]) else "unknown"
    sex = row['sex'].values[0] if not pd.isna(row['sex'].values[0]) else "male"

    site_mapping = {'upper extremity': 0, 'lower extremity': 1, 'torso': 2, 'head/neck': 3, 'anterior torso': 4, 'posterior torso': 5, 'unknown': 6}
    sex_mapping = {'male': 0, 'female': 1}

    site_encoded = site_mapping.get(site, 6)
    sex_encoded = sex_mapping.get(sex, 0)

    return torch.tensor([[age, site_encoded, sex_encoded]], dtype=torch.float32).to(device)

# Function to check for valid image files in a folder
def get_images_from_folder(folder_path):
    valid_extensions = (".jpg", ".jpeg", ".png")
    image_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.lower().endswith(valid_extensions)]
    return image_files

# Function to predict multiple images
def predict_images_in_folder(folder_path):
    image_files = get_images_from_folder(folder_path)

    if not image_files:
        print(f"❌ No images found in {folder_path}")
        return

    print(f"✅ Found {len(image_files)} images. Processing...")

    results = []

    for image_path in image_files:
        try:
            # Extract image ID from filename
            image_id = os.path.basename(image_path).split('.')[0]

            # Load and process the image
            image = Image.open(image_path).convert("RGB")
            image = transform(image).unsqueeze(0).to(device)

            # Fetch real metadata
            metadata = get_metadata(image_id)

            # Make prediction
            with torch.no_grad():
                output = model(image, metadata)
                _, predicted = torch.max(output, 1)

            # Store result
            results.append((image_id, class_names[predicted.item()]))
        except Exception as e:
            print(f"⚠️ Error processing {image_path}: {e}")

    # Print results
    print("\n✅ **Predictions for Images** ✅")
    for img_id, pred in results:
        print(f"{img_id}: {pred}")

# Run the function with a folder path
if __name__ == "__main__":
    folder_path = input("Enter folder path containing images: ")  # User enters folder path
    predict_images_in_folder(folder_path)
