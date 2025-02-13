import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import { Button } from "../components/ui/button";
import {
  Camera,
  Upload,
  ArrowLeft,
  X,
  Image as ImageIcon,
  Loader2,
  Brain,
} from "lucide-react";

type AnalysisResult = {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  additionalFindings: Array<{
    condition: string;
    probability: number;
  }>;
};

function AnalysisPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
      } else {
        alert("Failed to capture image. Please allow camera access.");
      }
    }
  }, [webcamRef]);

  const analyzeImage = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    // Simulated API call
    setTimeout(() => {
      setResult({
        diagnosis: "Benign Melanocytic Nevus",
        confidence: 0.89,
        recommendations: [
          "No immediate medical attention required",
          "Continue monitoring for changes",
          "Use sun protection regularly",
        ],
        additionalFindings: [
          { condition: "Solar Lentigines", probability: 0.15 },
          { condition: "Seborrheic Keratosis", probability: 0.08 },
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Skin Cancer Analysis</h1>

            {!image ? (
              <>
                <div className="flex space-x-4 mb-6">
                  <Button variant={activeTab === "upload" ? "primary" : "outline"} onClick={() => setActiveTab("upload")} className="flex-1">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Image
                  </Button>
                  <Button variant={activeTab === "camera" ? "primary" : "outline"} onClick={() => setActiveTab("camera")} className="flex-1">
                    <Camera className="mr-2 h-5 w-5" />
                    Use Camera
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "upload" ? (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600">Drag and drop your image here, or click to select</p>
                        <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
                      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded-xl" />
                      <Button type="button" onClick={captureImage} className="mt-4 w-full">
                        <Camera className="mr-2 h-5 w-5" />
                        Capture Photo
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="relative">
                <img src={image} alt="Uploaded" className="w-full rounded-xl" />
                <button
                  type="button"
                  onClick={resetAnalysis}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  title="Reset Analysis"
                  aria-label="Reset Analysis"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}

            {!result && (
              <Button type="button" onClick={analyzeImage} disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AnalysisPage;
