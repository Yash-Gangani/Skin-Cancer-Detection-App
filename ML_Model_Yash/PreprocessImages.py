import os
import shutil
import pandas as pd

# Define paths (For some reason it was not working with short path so I used whole path)
dataset_root = r"D:\University\Quarter 5\Studio Engineering\Skin Cancer Detection and Identification Application\ISIC-images"
image_source_folder = os.path.join(dataset_root, "")  # Folder where all images are stored
train_folder = os.path.join(dataset_root, "Train")
test_folder = os.path.join(dataset_root, "Test")
metadata_path = r"D:/University/Quarter 5/Studio Engineering/Skin Cancer Detection and Identification Application/ISIC-images/metadata.csv"

# Load metadata CSV
metadata = pd.read_csv(metadata_path)

# To Ensure Train/Test split (80% train, 20% test)
metadata = metadata.dropna(subset=['isic_id', 'benign_malignant'])  # Remove any missing values
train_split = metadata.sample(frac=0.8, random_state=42)
test_split = metadata.drop(train_split.index)

# Create necessary folders
for category in ["benign", "malignant"]:
    os.makedirs(os.path.join(train_folder, category), exist_ok=True)
    os.makedirs(os.path.join(test_folder, category), exist_ok=True)

# Debug: Print first few image names
print("First few image names from metadata:", metadata['isic_id'].head())
print("Example files in AllImages:", os.listdir(image_source_folder)[:5])

# This function is to move images
def move_images(data, destination_folder):
    moved_count = 0
    not_found_count = 0

    for _, row in data.iterrows():
        image_name = row['isic_id']
        label = row['benign_malignant']

        # Try different extensions
        found = False
        for ext in ['.jpg', '.jpeg', '.png']:
            src_path = os.path.join(image_source_folder, image_name + ext)
            dest_path = os.path.join(destination_folder, label, image_name + ext)

            if os.path.exists(src_path):
                shutil.move(src_path, dest_path)
                moved_count += 1
                found = True
                break  # Stop checking once found

        if not found:
            print(f"⚠️ Image not found: {image_name}")
            not_found_count += 1

    print(f"✅ Moved {moved_count} images.")
    print(f"⚠️ {not_found_count} images not found.")

# Move images to respective folders
move_images(train_split, train_folder)
move_images(test_split, test_folder)

print("✅ Dataset successfully sorted into Train/Test with 'benign' and 'malignant' folders!")
