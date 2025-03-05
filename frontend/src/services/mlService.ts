// src/services/mlService.ts

/**
 * Service to handle interactions with the ML model API
 */

// Define the result type based on your ML model's output
export interface SkinAnalysisResult {
    prediction: string;
    confidence: number;
    details: {
      cancerType: string;
      description: string;
      treatment: string[];
      next_steps: string[];
    };
    probabilities: {
      [key: string]: number;
    };
  }
  
  /**
   * Convert base64 image to a Blob
   */
  function base64ToBlob(base64: string, contentType: string = 'image/jpeg'): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];
  
    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    return new Blob(byteArrays, { type: contentType });
  }
  
  /**
   * Analyze skin image using ML model API
   * @param imageData - Base64 encoded image or File object
   */
  // Correct way to construct the URL
export async function analyzeSkinImage(imageData: string | File): Promise<SkinAnalysisResult> {
    // Make sure we're appending /predict to the base URL
    const baseUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';
    const predictUrl = `${baseUrl}/predict`;
    
    console.log(`Sending request to: ${predictUrl}`);
    
    try {
      const formData = new FormData();
      
      if (typeof imageData === 'string') {
        // Convert base64 to Blob for FormData
        const blob = base64ToBlob(imageData);
        formData.append('image', blob, 'image.jpg');
      } else {
        // If it's already a File object
        formData.append('image', imageData);
      }
  
      const response = await fetch(predictUrl, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }