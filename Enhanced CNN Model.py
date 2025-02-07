import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.transforms as transforms
import torchvision.datasets as datasets
import torch.nn.functional as F
from torchvision.models import resnet18, ResNet18_Weights
from torch.utils.data import DataLoader
import os
import pandas as pd
import numpy as np
from sklearn.utils import resample

# Dataset path(For some reason it was not working with short path so I used whole path)
dataset_root = r"D:\University\Quarter 5\Studio Engineering\Skin Cancer Detection and Identification Application\ISIC-images"
train_path = os.path.join(dataset_root, "Train")
test_path = os.path.join(dataset_root, "Test")

# Load metadata
metadata_path = os.path.join(dataset_root, "metadata.csv")
metadata_df = pd.read_csv(metadata_path)

# Balance dataset (if needed)
benign_df = metadata_df[metadata_df['benign_malignant'] == "benign"]
malignant_df = metadata_df[metadata_df['benign_malignant'] == "malignant"]
malignant_upsampled = resample(malignant_df, replace=True, n_samples=len(benign_df), random_state=42)
balanced_metadata = pd.concat([benign_df, malignant_upsampled])

# Defining image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

# Load datasets
train_data = datasets.ImageFolder(root=train_path, transform=transform)
test_data = datasets.ImageFolder(root=test_path, transform=transform)

# Create DataLoaders
batch_size = 32
train_loader = DataLoader(train_data, batch_size=batch_size, shuffle=True)
test_loader = DataLoader(test_data, batch_size=batch_size, shuffle=False)

# Extract class names
class_names = train_data.classes  # ['benign', 'malignant']

# Defining CNN model with metadata integration
class SkinDiseaseEnhancedCNN(nn.Module):
    def __init__(self, num_classes):
        super(SkinDiseaseEnhancedCNN, self).__init__()
        self.resnet = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
        self.resnet.fc = nn.Sequential(
            nn.Linear(self.resnet.fc.in_features, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
        )
        self.fc_metadata = nn.Sequential(
            nn.Linear(3, 32),  # Ensure correct metadata transformation
            nn.ReLU()
        )
        self.fc_combined = nn.Linear(160, num_classes)  # Correct final shape

    def forward(self, image, metadata):
        image_features = self.resnet(image)  # Shape: [batch_size, 128]
        metadata_features = self.fc_metadata(metadata)  # Shape: [batch_size, 32]

        combined = torch.cat((image_features, metadata_features), dim=1)  # Shape: [batch_size, 160]
        output = self.fc_combined(combined)  # Shape: [batch_size, num_classes]
        return output


# Instantiate model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
num_classes = len(class_names)
model = SkinDiseaseEnhancedCNN(num_classes).to(device)

# Compute class weights
benign_count = len(benign_df)
malignant_count = len(malignant_df)
total = benign_count + malignant_count
benign_weight = total / (2 * benign_count)
malignant_weight = total / (2 * malignant_count)
class_weights = torch.tensor([benign_weight, malignant_weight], dtype=torch.float32).to(device)

criterion = nn.CrossEntropyLoss(weight=class_weights)
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-4)

# Function to get metadata
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

# Training Loop
num_epochs = 10
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        metadata = torch.cat([get_metadata(os.path.basename(path).split('.')[0]) for path, _ in train_data.samples[:len(images)]], dim=0)

        optimizer.zero_grad()
        outputs = model(images, metadata)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    print(f"Epoch {epoch+1}/{num_epochs}, Loss: {running_loss/len(train_loader)}")

# Save trained model
torch.save(model.state_dict(), "enhanced_skin_disease_model.pth")
print("✅ Model trained and saved successfully!")

# Model Evaluation
model.eval()
correct = 0
total = 0

with torch.no_grad():
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        metadata = torch.cat([get_metadata(os.path.basename(path).split('.')[0]) for path, _ in test_data.samples[:len(images)]], dim=0)

        outputs = model(images, metadata)
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

accuracy = 100 * correct / total
print(f"✅ Model Accuracy: {accuracy:.2f}%")
