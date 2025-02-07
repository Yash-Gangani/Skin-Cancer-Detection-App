import pandas as pd
from sklearn.preprocessing import LabelEncoder
import torch
from torch.utils.data import DataLoader
import torchvision.transforms as transforms
import torchvision.datasets as datasets

# Load metadata (For some reason it was not working with short path so I used whole path)
metadata_path = "D:/University/Quarter 5/Studio Engineering/Skin Cancer Detection and Identification Application/ISIC-images/metadata.csv"  # Update path if needed
metadata_df = pd.read_csv(metadata_path)

# Keeping relevant columns and drop missing values
metadata_df = metadata_df[['isic_id', 'age_approx', 'anatom_site_general', 'benign_malignant', 'sex']].dropna()

# Encode categorical features
label_encoders = {}
for column in ['anatom_site_general', 'sex', 'benign_malignant']:
    le = LabelEncoder()
    metadata_df[column] = le.fit_transform(metadata_df[column])
    label_encoders[column] = le

# Prepare metadata as tensors
metadata_features = torch.tensor(metadata_df[['age_approx', 'anatom_site_general', 'sex']].values, dtype=torch.float32)
metadata_labels = torch.tensor(metadata_df['benign_malignant'].values, dtype=torch.long)
