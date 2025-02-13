import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Upload, Brain, Shield, Activity, Camera, FileCheck, AlertCircle } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkinOCare AI</span>
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {/* <Button variant="secondary">About</Button> */}
              <Button variant="secondary" onClick={() => navigate('/about')}>About</Button>

              <Button onClick={() => navigate('/analysis')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-2 px-4 rounded-full bg-blue-100 text-blue-700 mb-6"
          >
            AI-Powered Skin Cancer Analysis
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Early Detection for 
            <span className="text-blue-600"> Better Protection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our advanced AI technology helps identify potential skin concerns with high accuracy, providing you peace of mind and early intervention opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="text-lg px-8 py-4" onClick={() => navigate('/analysis')}>
              <Upload className="mr-2 h-5 w-5" />
              Analyze Now
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {[
            {
              icon: Brain,
              title: "Advanced AI Analysis",
              description: "Powered by state-of-the-art deep learning models trained on extensive medical datasets.",
              color: "blue"
            },
            {
              icon: Shield,
              title: "Privacy First",
              description: "Your data is encrypted and handled with the utmost care, ensuring complete privacy and security.",
              color: "green"
            },
            {
              icon: Activity,
              title: "Quick Results",
              description: "Get instant analysis results with detailed explanations and recommended next steps.",
              color: "purple"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl p-8 border border-gray-100"
            >
              <div className={`h-14 w-14 rounded-xl mb-6 flex items-center justify-center 
                ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : 
                  feature.color === 'green' ? 'bg-green-100 text-green-600' : 
                  'bg-purple-100 text-purple-600'}`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with our simple three-step process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Take or Upload Photo",
                description: "Capture a clear image of the skin area you'd like to analyze"
              },
              {
                icon: FileCheck,
                title: "AI Analysis",
                description: "Our advanced AI processes the image and identifies potential concerns"
              },
              {
                icon: AlertCircle,
                title: "Get Results",
                description: "Receive detailed analysis with recommended next steps"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-white rounded-full h-20 w-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <step.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our AI-powered skin analysis for early detection and peace of mind.
            </p>
            <Button variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate('/analysis')}>
              Try It Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
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

export default LandingPage;









