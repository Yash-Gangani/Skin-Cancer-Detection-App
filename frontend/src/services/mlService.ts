
// export interface SkinAnalysisResult {
//     prediction: string;
//     confidence: number;
//     details: {
//       cancerType: string;
//       description: string;
//       treatment: string[];
//       next_steps: string[];
//     };
//     probabilities: {
//       [key: string]: number;
//     };
//   }
  
//   function base64ToBlob(base64: string, contentType: string = 'image/jpeg'): Blob {
//     const byteCharacters = atob(base64.split(',')[1]);
//     const byteArrays = [];
  
//     for (let i = 0; i < byteCharacters.length; i += 512) {
//       const slice = byteCharacters.slice(i, i + 512);
//       const byteNumbers = new Array(slice.length);
      
//       for (let j = 0; j < slice.length; j++) {
//         byteNumbers[j] = slice.charCodeAt(j);
//       }
      
//       byteArrays.push(new Uint8Array(byteNumbers));
//     }
  
//     return new Blob(byteArrays, { type: contentType });
//   }
  


// export async function analyzeSkinImage(imageData: string | File): Promise<SkinAnalysisResult> {
//   const baseUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';
//   const predictUrl = `${baseUrl}/predict`;
  
//   console.log(`Sending request to: ${predictUrl}`);
  
//   try {
//     const formData = new FormData();
    
//     if (typeof imageData === 'string') {
//       const blob = base64ToBlob(imageData);
//       formData.append('image', blob, 'image.jpg');
//     } else {
//       formData.append('image', imageData);
//     }

//     const response = await fetch(predictUrl, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       console.error(`API error: ${response.status}`);
//       throw new Error(`API error: ${response.status}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error analyzing image:', error);
//     throw error;
//   }
// }



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

// Environment configuration with fallbacks
const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';
const BACKEND_URL = import.meta.env.VITE_BACK_END_URL || 'http://localhost:4000';

/**
 * Analyzes a skin image for potential cancer detection
 * @param imageData - Base64 string or File object containing the image to analyze
 * @returns Promise with analysis results
 */
export async function analyzeSkinImage(imageData: string | File): Promise<SkinAnalysisResult> {
  const predictUrl = `${ML_API_URL}/predict`;
  
  console.log(`Sending image analysis request to: ${predictUrl}`);
  
  try {
    const formData = new FormData();
    
    if (typeof imageData === 'string') {
      const blob = base64ToBlob(imageData);
      formData.append('image', blob, 'image.jpg');
    } else {
      formData.append('image', imageData);
    }

    const response = await fetch(predictUrl, {
      method: 'POST',
      body: formData,
      // Adding timeout and better error handling
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text().catch(() => 'Unknown error');
      console.error(`ML API error (${response.status}): ${errorMessage}`);
      throw new Error(`ML API error: ${response.status} - ${errorMessage}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing image:', error);
    
    // Enhanced error reporting
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - ML API might be unavailable');
      throw new Error('Unable to connect to the analysis service. Please check your internet connection and try again.');
    }
    
    throw error;
  }
}

/**
 * Checks if ML API service is available
 * @returns Promise with health status
 */
export async function checkMlApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${ML_API_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('ML API health status:', data);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('ML API health check failed:', error);
    return false;
  }
}

/**
 * Fetches cancer type information from the backend
 * @returns Promise with cancer type information
 */
export async function getCancerTypes() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/cancer-types`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cancer types: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cancer types:', error);
    throw error;
  }
}