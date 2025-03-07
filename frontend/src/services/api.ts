// src/services/api.ts
import axios from 'axios';

// These will be replaced at runtime by the env.sh script
const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
const ML_API_URL = import.meta.env.VITE_ML_API_URL;

console.log('Using backend URL:', BACKEND_URL);
console.log('Using ML API URL:', ML_API_URL);

// Create API clients
export const backendApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const mlApi = axios.create({
  baseURL: ML_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Example API call
// export const getSkinTypes = async () => {
//   try {
//     const response = await backendApi.get('/api/cancer-types');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching skin types:', error);
//     throw error;
//   }
// };

export const getSkinTypes = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/cancer-types`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cancer types:', error);
    throw error;
  }
};






// export const analyzeSkinImage = async (imageData: File) => {
//   const formData = new FormData();
//   formData.append('image', imageData);
  
//   try {
//     const response = await mlApi.post('/predict', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error analyzing image:', error);
//     throw error;
//   }
// };

export const analyzeSkinImage = async (imageData: File) => {
  const formData = new FormData();
  formData.append('image', imageData);
  
  try {
    const response = await fetch(`${ML_API_URL}/predict`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};