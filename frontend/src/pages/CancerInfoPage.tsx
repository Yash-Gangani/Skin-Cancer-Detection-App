
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Camera, ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface CancerType {
  name: string;
  description: string;
  treatment: string[];
  next_steps: string[];
}

function CancerInfoPage() {
  const navigate = useNavigate();
  const [cancerTypes, setCancerTypes] = useState<CancerType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCancerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/cancer-types');
        console.log('Cancer data response:', response.data); 
        
        let data;
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data && typeof response.data === 'object') {
          const possibleArrayProps = Object.values(response.data).filter(value => Array.isArray(value));
          if (possibleArrayProps.length > 0) {
            data = possibleArrayProps[0];
          } else {
            data = [response.data];
          }
        } else {
          data = [];
        }
        
        setCancerTypes(data as CancerType[]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cancer data:', err);
        setError('Failed to load cancer information. Please try again later.');
        setLoading(false);
      }
    };

    fetchCancerData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkinOCare AI</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Button variant="secondary" onClick={() => navigate('/about')}>About</Button>
              <Button variant="primary" onClick={() => navigate('/analysis')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-4 pb-16">
        <Button 
          variant="secondary" 
          className="mb-6 flex items-center mt-4" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Understanding <span className="text-blue-600">Skin Cancer</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn about different types of skin conditions, their treatments, and recommended next steps.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : cancerTypes && cancerTypes.length > 0 ? (
          <div className="space-y-16">
            {cancerTypes.map((cancer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {cancer.name}
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {cancer.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="h-3 w-3 bg-blue-600 rounded-full mr-2"></div>
                        Treatment Options
                      </h3>
                      <ul className="space-y-3">
                        {cancer.treatment && Array.isArray(cancer.treatment) ? 
                          cancer.treatment.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-600 font-bold mr-2">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          )) : 
                          <li className="flex items-start">
                            <span className="text-blue-600 font-bold mr-2">•</span>
                            <span className="text-gray-700">No treatment information available</span>
                          </li>
                        }
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <div className="h-3 w-3 bg-green-600 rounded-full mr-2"></div>
                        Next Steps
                      </h3>
                      <ul className="space-y-3">
                        {cancer.next_steps && Array.isArray(cancer.next_steps) ?
                          cancer.next_steps.map((step, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-600 font-bold mr-2">•</span>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          )) :
                          <li className="flex items-start">
                            <span className="text-green-600 font-bold mr-2">•</span>
                            <span className="text-gray-700">No next steps information available</span>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No cancer information available.</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Button 
            variant="primary"
            className="px-8 py-4 text-lg"
            onClick={() => navigate('/analysis')}
          >
            Analyze Your Skin Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-14 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div 
              className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Camera className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">SkinOCare AI</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2025 SkinOCare AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CancerInfoPage;