import { API_ENDPOINTS } from './config';

export interface PredictionResponse {
  predicted_class: string;
  confidence: number;
}

export const PredictionService = {
  async predict(imageFile: File): Promise<PredictionResponse> {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${API_ENDPOINTS.ML_MODEL}${API_ENDPOINTS.PREDICT}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Prediction failed');
    }

    return response.json();
  }
};