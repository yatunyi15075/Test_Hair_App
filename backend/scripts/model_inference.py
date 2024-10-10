import sys
import torch
import torchvision.transforms as transforms
from PIL import Image
import json

# Replace with your actual model class or import from another file
class YourModelClass(torch.nn.Module):
    def __init__(self):
        super(YourModelClass, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 16, 3, 1)
        self.fc1 = torch.nn.Linear(16 * 26 * 26, 10)

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = x.view(-1, 16 * 26 * 26)
        x = self.fc1(x)
        return x

# Get the arguments passed from Node.js
image_path, weights_file, metadata_file = sys.argv[1], sys.argv[2], sys.argv[3]

try:
    # Load the model architecture
    model = YourModelClass()
    
    # Load the state_dict
    model.load_state_dict(torch.load(weights_file, map_location=torch.device('cpu')))
    model.eval()
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

try:
    # Load metadata for preprocessing information
    with open(metadata_file, 'r') as f:
        metadata = json.load(f)

    # Use input size from metadata or default to (224, 224)
    input_height = metadata.get('input_height', 224)
    input_width = metadata.get('input_width', 224)

    # Define preprocessing transformations
    transform = transforms.Compose([
        transforms.Resize((input_height, input_width)),
        transforms.ToTensor(),
    ])

    # Open the image and apply the transformations
    image = Image.open(image_path)
    image = transform(image).unsqueeze(0)  # Add batch dimension

    # Perform inference
    with torch.no_grad():
        output = model(image)
        _, predicted = torch.max(output, 1)

    # Output the result as a JSON string
    print(json.dumps({'prediction': int(predicted.item())}))

except Exception as e:
    print(f"Error during inference: {e}")
    sys.exit(1)
