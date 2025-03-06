
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
  


export async function analyzeSkinImage(imageData: string | File): Promise<SkinAnalysisResult> {
  const baseUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';
  const predictUrl = `${baseUrl}/predict`;
  
  console.log(`Sending request to: ${predictUrl}`);
  
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
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}
