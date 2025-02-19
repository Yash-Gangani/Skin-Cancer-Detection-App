import { API_ENDPOINTS } from './config';

export interface CancerType {
  name: string;
  description: string;
  treatment: string[];
  next_steps: string[];
}

export const CancerTypeService = {
  async getTypeByName(name: string): Promise<CancerType> {
    const response = await fetch(`${API_ENDPOINTS.BASE_URL}/typeName/${name}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cancer type information');
    }
    return response.json();
  }
};