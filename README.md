# SkinOCare AI 🔬 - Skin Cancer Detection Application

<div align="center">
  <img src="https://github.com/user-attachments/assets/12d5473c-6bf3-4e7b-81c7-ace998d24c5c" alt="SkinOCare AI Logo" width="600"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://www.docker.com/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-2.18.0-orange.svg)](https://www.tensorflow.org/)
  [![React](https://img.shields.io/badge/React-Latest-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
</div>

## 📑 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Machine Learning Model](#-machine-learning-model)
- [API Documentation](#-api-documentation)
- [Frontend](#-frontend)
- [Backend](#-backend)
- [CI/CD](#-cicd)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

## 🔍 Overview

SkinOCare AI is a comprehensive web application developed at DePaul University (SE491 Team Project) that uses deep learning to detect and classify various types of skin cancers from uploaded images. Our application aims to provide an accessible tool for early detection and guidance, potentially saving lives through timely intervention.

The system analyzes dermoscopic images using a CNN-based machine learning model trained on the HAM10000 dataset, which consists of over 10,000 dermatoscopic images of common pigmented skin lesions. The application provides detailed information about the detected skin condition, recommended next steps, and available treatment options.

> ⚠️ **Disclaimer**: SkinOCare AI is a research and educational tool and should not replace professional medical diagnosis. Always consult with a healthcare professional for medical advice.


## ✨ Features

- **Image Analysis**: Upload and analyze dermoscopic images for skin cancer detection
- **Multi-Class Classification**: Identifies 7 different types of skin lesions:
  - Actinic Keratoses
  - Basal Cell Carcinoma
  - Benign Keratosis-like Lesions
  - Dermatofibroma
  - Melanoma
  - Melanocytic Nevi
  - Vascular Lesions
- **Detailed Reports**: Get comprehensive analysis results with confidence scores
- **Educational Resources**: Access information about different skin cancer types
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **User-Friendly Interface**: Intuitive UI for easy navigation and usage

## 🛠 Technology Stack

### Frontend
- **React.js** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development and build
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** for data storage
- **Babel** for ES6+ support
- **Nodemon** for development

### Machine Learning
- **TensorFlow** (2.18.0)
- **Keras** for neural network implementation
- **Flask** for ML API
- **OpenCV** for image processing
- **NumPy** for numerical computations

### DevOps & Infrastructure
- **Docker** and Docker Compose for containerization
- **GitHub Actions** for CI/CD
- **Vercel** for deployment

## 📂 Project Structure

```
└── skadakia01-skin-cancer-detection-app/
    ├── frontend/           # React application
    ├── backend/            # Node.js Express server
    ├── Ml_Model/           # Python ML model and Flask API
    ├── docker-compose.yml  # Docker configuration
    ├── design-docs/        # Design documentation
    └── project-docs/       # Project presentations and documents
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Python](https://www.python.org/) 3.9+ (if running ML model locally)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skadakia01-skin-cancer-detection-app.git
   cd skadakia01-skin-cancer-detection-app
   ```

2. Using Docker (Recommended):
   ```bash
   docker-compose up
   ```

3. Manual Setup (Alternative):

   **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   **ML API:**
   ```bash
   cd Ml_Model
   python -m venv skin_ml_env
   source skin_ml_env/bin/activate  # On Windows: skin_ml_env\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```
   **Setup MongoDB (required for backend)**
   ```bash
   # Option 1: Use MongoDB Atlas cloud database
   Update .env file with your MongoDB Atlas connection string
   
   # Option 2: Run MongoDB locally
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```


### Environment Variables

Create the following `.env` files for local development:

- **Frontend (.env.development)**
   ```bash
   VITE_BACK_END_URL=http://localhost:4000
   VITE_ML_API_URL=http://localhost:5001
   ```

- **Backend (.env)**
   ```bash
   NODE_ENV=development
   DEV_PORT=4000
   DEV_MONGO_URI=mongodb://localhost:27017/skinocare
   PROD_PORT=4000
   PROD_MONGO_URI=mongodb://mongo:27017/skinocare
   ```


### Running the Application

After starting all components:
- Frontend: http://localhost:80
- Backend API: http://localhost:4000
- ML API: http://localhost:5001


## 🏗 Architecture

### System Architecture

SkinOCare AI follows a microservices architecture pattern with three main components:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   ML API    │
│  (React.js) │◀────│  (Node.js)  │◀────│   (Flask)   │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  Database   │
                    │  (MongoDB)  │
                    └─────────────┘
```

1. **Frontend (Presentation Layer)**:
   - Responsible for user interface and interactions
   - Communicates with the backend through RESTful API calls

2. **Backend (Application Layer)**:
   - Handles business logic and data processing
   - Provides RESTful API endpoints for the frontend
   - Communicates with the ML API for image analysis
   - Manages database operations

3. **ML API (Machine Learning Layer)**:
   - Processes image data using the trained CNN model
   - Returns prediction results and confidence scores
   - Operates independently from the main application

4. **Database (Data Layer)**:
   - Stores cancer type information and metadata
   - Potentially stores user data and analysis history (future implementation)


## 💻 Frontend

The frontend is built with React and TypeScript, providing a responsive and intuitive user interface. Key pages include:

- **Landing Page**: Introduction to the application
- **Analysis Page**: Upload and analyze skin images
- **Cancer Information**: Educational resources about different skin cancers
- **About Page**: Project and team information

## 🔧 Backend

Our Node.js backend serves as an intermediary between the frontend and the ML model, handling authentication, data storage, and API proxying. It provides a unified API for the frontend and ensures secure communication with the ML service.

## 🔄 CI/CD

We use GitHub Actions for continuous integration and deployment:

- Automated testing of frontend, backend, and ML components
- Docker image building and publishing
- Deployment to Vercel for staging and production environments

## 🧠 Machine Learning Model

The core of our application is a Convolutional Neural Network (CNN) built using TensorFlow and Keras. The model was trained on the HAM10000 dataset, which contains over 10,000 dermatoscopic images across 7 different skin lesion types.

### Model Architecture

- Input layer: 64x64x3 (RGB images)
- 3 Convolutional layers with max pooling
- Fully connected layer with 128 neurons
- Dropout layer (0.5)
- Output layer with 7 neurons (Softmax)

### Training Performance

The model achieved approximately 75.94% accuracy on the test dataset. For production use, we employed data augmentation techniques to improve robustness and prevent overfitting.

### Prediction Pipeline

1. Image preprocessing (resize to 64x64, normalization)
2. Model prediction
3. Classification result with confidence scores
4. Associated medical information retrieval

## 📡 API Documentation

### ML API Endpoints

- `GET /`: Health check
- `GET /health`: Detailed health status of ML service
- `POST /predict`: Submit an image for analysis
  - Request: Form data with image file
  - Response: JSON with prediction, confidence scores, and medical details

### Backend API Endpoints

- `GET /api/cancers`: Get all cancer types information
- `GET /api/cancers/:id`: Get specific cancer information
- `POST /api/upload`: Upload an image for analysis (proxies to ML service)

## 👥 Contributing

We welcome contributions from the community! Please read our contribution guidelines before submitting pull requests.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👨‍💻 Team

| Name | Background | Tasks |
| ---- | ---- | ---- |
| Shlok Kadakia | <ul><li>MS in Computer Science (DePaul University, November '25)</li><li>Bachelors in Information Technology (2019-2023, Navrachana University, India)</li><li>Born: Dahod, Gujarat, India; Current: Carol Stream, IL</li><li>Javascript, Python, React.js, Java, SQL, Docker, .NET</li></ul>| React.js frontend, backend development, Docker configuration, CI/CD pipeline |
| John Smillie | <ul><li>MS in Computer Science: Software Engineering (June '25)</li><li>Born: Ann Arbor, MI; Current: Chicago, IL</li><li>Bachelor in Music from Roosevelt University</li><li>Java, HTML, CSS, JavaScript, SQL, Spring, React.js, Azure, .NET</li></ul>| Express.js backend, CI/CD pipeline |
| Zarana Jodhani |<ul><li>MS in Computer Science: (June'26)</li><li>Chicago, IL</li><li>Bachelor in Information Technology(Gujarat, India)</li><li>Python, HTML, CSS, SQL, React.js, Azure, Docker, Kubernetes</li></ul>| Docker configuration, CI/CD pipeline |
| Jayalakshmi Thrisalapuram Jayaprakash | <ul><li>MS in Software Engineering (DePaul University, Present)</li><li>Master of Intelligence Systems and Robotics (2022-2023, University of Essex)</li><li>Born: Kerala, India; Current: Summit, IL</li><li>ASP .NET, C#, HTML, CSS, SQL Server, Python, Machine Learning, Neural Networking</li></ul>| Building ML models, image analysis algorithms, backend systems |
| Ashutosh Bhalala | <ul><li>MS in Software Engineering (DePaul University, June '25)</li><li>Bachelors in Computer Science (2019-2023, University of Wisconsin-Madison)</li><li>Born: Waukegan, Illinois; Current: Gurnee, IL</li><li>Javascript, Python, React.js, HTML, CSS, SQL</li></ul>| Frontend and backend development, testing |
| Yash Gangani | <ul><li>MS in Computer Science: Software and System Development (June '25)</li><li>Chicago, IL</li><li>Bachelor in Information Technology from Mumbai University</li><li>Java, HTML5, CSS3, R, SQL, Python, React.js, .NET</li></ul>| Database design, Backend systems, Image analysis algorithms|

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Built with ❤️ at SkinOCare AI Team</p>
  <p>© 2025 SkinOCare AI Team</p>
</div>