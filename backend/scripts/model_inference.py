import sys
import torch
import torchvision.transforms as transforms
from PIL import Image
import json

# Get the arguments passed from the Node.js backend
image_path, model_file, metadata_file = sys.argv[1], sys.argv[2], sys.argv[3]

# Load the model and metadata
model = torch.load(model_file)
model.eval()

# Load metadata (if needed for preprocessing)
with open(metadata_file, 'r') as f:
    metadata = json.load(f)

# Define preprocessing transformations based on the model metadata
transform = transforms.Compose([
    transforms.Resize((metadata['input_height'], metadata['input_width'])),
    transforms.ToTensor(),
])

# Open the image and apply the transformations
image = Image.open(image_path)
image = transform(image).unsqueeze(0)  # Add batch dimension

# Perform inference
with torch.no_grad():
    output = model(image)
    _, predicted = torch.max(output, 1)

# Output the result as a JSON string for Node.js to capture
print(json.dumps({'prediction': int(predicted.item())}))



# import sys
# import torch
# import torchvision.transforms as transforms
# from PIL import Image
# import json

# # Get the arguments passed from the Node.js backend
# image_path, model_file, metadata_file = sys.argv[1], sys.argv[2], sys.argv[3]

# # Load the model and metadata
# model = torch.load(model_file)
# model.eval()

# # Load metadata (if needed for preprocessing)
# with open(metadata_file, 'r') as f:
#     metadata = json.load(f)

# # Define preprocessing transformations based on the model metadata
# transform = transforms.Compose([
#     transforms.Resize((metadata['input_height'], metadata['input_width'])),
#     transforms.ToTensor(),
# ])

# # Open the image and apply the transformations
# image = Image.open(image_path)
# image = transform(image).unsqueeze(0)  # Add batch dimension

# # Perform inference
# with torch.no_grad():
#     output = model(image)
#     _, predicted = torch.max(output, 1)

# # Output the result as a JSON string for Node.js to capture
# print(json.dumps({'prediction': int(predicted.item())}))
