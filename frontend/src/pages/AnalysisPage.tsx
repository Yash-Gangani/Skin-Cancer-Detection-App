// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDropzone } from "react-dropzone";
// import Webcam from "react-webcam";
// import { Button } from "../components/ui/button";
// import {
//   Camera,
//   Upload,
//   ArrowLeft,
//   X,
//   Image as ImageIcon,
//   Loader2,
//   Brain,
// } from "lucide-react";

// const URL = import.meta.env.VITE_BACK_END_URL;
// console.log("Backend URL: " + URL);


// /*type AnalysisResult = {
//   diagnosis: string;
//   confidence: number;
//   recommendations: string[];
//   additionalFindings: Array<{
//     condition: string;
//     probability: number;
//   }>;
// };*/

// async function pingBackend(){
//   try {
//     const response = await fetch(URL);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.text();
//     console.log(json);
//     alert(json);
//   }
//   catch (error) {
//     console.error("Failed to ping backend:", error);
//     alert("failed to ping backend");
//   }
  
// }

// function AnalysisPage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
//   const [image, setImage] = useState<string | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [result, setResult] = useState(null);
//   const webcamRef = React.useRef<Webcam>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/jpeg": [],
//       "image/png": [],
//     },
//     maxFiles: 1,
//   });

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         setImage(imageSrc);
//       } else {
//         alert("Failed to capture image. Please allow camera access.");
//       }
//     }
//   }, [webcamRef]);

//   const analyzeImage = async () => {
//     if (!image) return;

//     setIsAnalyzing(true);
//     // Simulated API call
//     pingBackend();
    

//     setIsAnalyzing(false);
//     resetAnalysis()
   
//   };

//   const resetAnalysis = () => {
//     setImage(null);
//     setResult(null);
//   };


  

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <motion.button
//               type="button"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate("/")}
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft className="h-5 w-5" />
//               <span>Back to Home</span>
//             </motion.button>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Skin Cancer Analysis</h1>

//             {!image ? (
//               <>
//                 <div className="flex space-x-4 mb-6">
//                   <Button variant={activeTab === "upload" ? "primary" : "outline"} onClick={() => setActiveTab("upload")} className="flex-1">
//                     <Upload className="mr-2 h-5 w-5" />
//                     Upload Image
//                   </Button>
//                   <Button variant={activeTab === "camera" ? "primary" : "outline"} onClick={() => setActiveTab("camera")} className="flex-1">
//                     <Camera className="mr-2 h-5 w-5" />
//                     Use Camera
//                   </Button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   {activeTab === "upload" ? (
//                     <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                       <div
//                         {...getRootProps()}
//                         className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
//                           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
//                         }`}
//                       >
//                         <input {...getInputProps()} />
//                         <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                         <p className="text-gray-600">Drag and drop your image here, or click to select</p>
//                         <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG</p>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded-xl" />
//                       <Button type="button" onClick={captureImage} className="mt-4 w-full">
//                         <Camera className="mr-2 h-5 w-5" />
//                         Capture Photo
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             ) : (
//               <div className="relative">
//                 <img src={image} alt="Uploaded" className="w-full rounded-xl max-w-[90%] mx-auto" />
      
//                 <button
//                   type="button"
//                   onClick={resetAnalysis}
//                   className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
//                   title="Reset Analysis"
//                   aria-label="Reset Analysis"
//                 >
//                   <X className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {!result && (
//               <Button type="button" onClick={analyzeImage} disabled={isAnalyzing} className="w-full mt-2">
//                 {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
//                 {isAnalyzing ? "Analyzing..." : "Analyze Image"}
//               </Button>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default AnalysisPage;




// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDropzone } from "react-dropzone";
// import Webcam from "react-webcam";
// import { Button } from "../components/ui/button";
// import {
//   Camera,
//   Upload,
//   ArrowLeft,
//   X,
//   Image as ImageIcon,
//   Loader2,
//   Brain,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { analyzeSkinImage, SkinAnalysisResult } from "../services/mlService";

// // For backend connectivity testing
// const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
// // For ML API connectivity
// const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';

// async function pingBackend(){
//   try {
//     const response = await fetch(BACKEND_URL);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.text();
//     console.log(json);
//     return json;
//   }
//   catch (error) {
//     console.error("Failed to ping backend:", error);
//     throw error;
//   }
// }

// async function pingMlApi() {
//   try {
//     const response = await fetch(`${ML_API_URL}/health`);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error("Failed to ping ML API:", error);
//     throw error;
//   }
// }

// function AnalysisPage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
//   const [image, setImage] = useState<string | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [result, setResult] = useState<SkinAnalysisResult | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
//   const webcamRef = React.useRef<Webcam>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/jpeg": [],
//       "image/png": [],
//     },
//     maxFiles: 1,
//   });

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         setImage(imageSrc);
//       } else {
//         setError("Failed to capture image. Please allow camera access.");
//       }
//     }
//   }, [webcamRef]);

//   const analyzeImage = async () => {
//     if (!image) return;

//     setIsAnalyzing(true);
//     setError(null);
    
//     try {
//       // First check if ML API is available
//       await pingMlApi();
      
//       // Analyze the image
//       const analysisResult = await analyzeSkinImage(image);
//       setResult(analysisResult);
//     } catch (err) {
//       console.error("Analysis error:", err);
//       setError("Unable to analyze the image. Please try again or check if ML service is running.");
      
//       // Try to ping backend as a fallback
//       try {
//         const backendResponse = await pingBackend();
//         console.log("Backend is available:", backendResponse);
//       } catch (backendErr) {
//         console.error("Backend is also unavailable:", backendErr);
//       }
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const resetAnalysis = () => {
//     setImage(null);
//     setResult(null);
//     setError(null);
//     setExpandedSection(null);
//   };

//   const toggleSection = (section: string) => {
//     if (expandedSection === section) {
//       setExpandedSection(null);
//     } else {
//       setExpandedSection(section);
//     }
//   };

//   const getConfidenceColor = (confidence: number) => {
//     if (confidence >= 0.7) return "text-green-600";
//     if (confidence >= 0.4) return "text-yellow-600";
//     return "text-red-600";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <motion.button
//               type="button"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate("/")}
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
//             >
//               <ArrowLeft className="h-5 w-5" />
//               <span>Back to Home</span>
//             </motion.button>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Skin Cancer Analysis</h1>

//             {!image ? (
//               <>
//                 <div className="flex space-x-4 mb-6">
//                   <Button variant={activeTab === "upload" ? "primary" : "outline"} onClick={() => setActiveTab("upload")} className="flex-1">
//                     <Upload className="mr-2 h-5 w-5" />
//                     Upload Image
//                   </Button>
//                   <Button variant={activeTab === "camera" ? "primary" : "outline"} onClick={() => setActiveTab("camera")} className="flex-1">
//                     <Camera className="mr-2 h-5 w-5" />
//                     Use Camera
//                   </Button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   {activeTab === "upload" ? (
//                     <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
// <div
//   {...getRootProps()}
//   className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors h-80 flex flex-col items-center justify-center ${
//     isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
//   }`}
// >
//   <input {...getInputProps()} />
//   <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
//   <p className="text-lg text-gray-600">Drag and drop your image here, or click to select</p>
//   <p className="text-sm text-gray-500 mt-3">Supported formats: JPEG, PNG</p>
// </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded-xl" />
//                       <Button type="button" onClick={captureImage} className="mt-4 w-full">
//                         <Camera className="mr-2 h-5 w-5" />
//                         Capture Photo
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             ) : (
//               <div className="relative">
//                 <img src={image} alt="Uploaded" className="w-full rounded-xl max-h-96 object-contain mx-auto" />
      
//                 <button
//                   type="button"
//                   onClick={resetAnalysis}
//                   className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
//                   title="Reset Analysis"
//                   aria-label="Reset Analysis"
//                 >
//                   <X className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
//             )}

//             {error && (
//               <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
//                 <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
//                 <div>{error}</div>
//               </div>
//             )}

//             {!result && image && (
//               <Button 
//                 type="button" 
//                 onClick={analyzeImage} 
//                 disabled={isAnalyzing} 
//                 className="w-full mt-4"
//               >
//                 {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
//                 {isAnalyzing ? "Analyzing..." : "Analyze Image"}
//               </Button>
//             )}

//             {result && (
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }} 
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-8 bg-gray-50 rounded-xl p-6"
//               >
//                 <div className="flex items-center mb-4">
//                   <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//                   <h2 className="text-2xl font-semibold">Analysis Complete</h2>
//                 </div>

//                 <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//                   <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-medium">Prediction</h3>
//                     <span className={`font-semibold ${getConfidenceColor(result.confidence)}`}>
//                       {(result.confidence * 100).toFixed(1)}% confidence
//                     </span>
//                   </div>
//                   <p className="text-xl font-bold capitalize mt-2">{result.prediction.replace('_', ' ')}</p>
//                   <p className="text-gray-600 mt-1">{result.details.description}</p>
//                 </div>

//                 {/* Treatment */}
//                 <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//                   <button 
//                     onClick={() => toggleSection('treatment')} 
//                     className="w-full flex justify-between items-center"
//                   >
//                     <h3 className="text-lg font-medium">Treatment Options</h3>
//                     {expandedSection === 'treatment' ? 
//                       <ChevronUp className="h-5 w-5" /> : 
//                       <ChevronDown className="h-5 w-5" />
//                     }
//                   </button>
                  
//                   {expandedSection === 'treatment' && (
//                     <div className="mt-3 pl-2">
//                       {result.details.treatment.length > 0 ? (
//                         <ul className="list-disc pl-5 space-y-1">
//                           {result.details.treatment.map((item, i) => (
//                             <li key={i} className="text-gray-700">{item}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-600 italic">No treatment information available</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Next Steps */}
//                 <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//                   <button 
//                     onClick={() => toggleSection('next_steps')} 
//                     className="w-full flex justify-between items-center"
//                   >
//                     <h3 className="text-lg font-medium">Recommended Next Steps</h3>
//                     {expandedSection === 'next_steps' ? 
//                       <ChevronUp className="h-5 w-5" /> : 
//                       <ChevronDown className="h-5 w-5" />
//                     }
//                   </button>
                  
//                   {expandedSection === 'next_steps' && (
//                     <div className="mt-3 pl-2">
//                       {result.details.next_steps.length > 0 ? (
//                         <ul className="list-disc pl-5 space-y-1">
//                           {result.details.next_steps.map((item, i) => (
//                             <li key={i} className="text-gray-700">{item}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-600 italic">No next steps information available</p>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Other Probabilities */}
//                 <div className="bg-white p-4 rounded-lg shadow-sm">
//                   <button 
//                     onClick={() => toggleSection('probabilities')} 
//                     className="w-full flex justify-between items-center"
//                   >
//                     <h3 className="text-lg font-medium">All Probabilities</h3>
//                     {expandedSection === 'probabilities' ? 
//                       <ChevronUp className="h-5 w-5" /> : 
//                       <ChevronDown className="h-5 w-5" />
//                     }
//                   </button>
                  
//                   {expandedSection === 'probabilities' && (
//                     <div className="mt-3">
//                       {Object.entries(result.probabilities)
//                         .sort(([, a], [, b]) => b - a)
//                         .map(([label, probability]) => (
//                           <div key={label} className="flex justify-between items-center mb-2">
//                             <span className="capitalize">{label.replace('_', ' ')}</span>
//                             <div className="flex items-center">
//                               <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
//                                 <div 
//                                   className="bg-blue-600 h-2.5 rounded-full" 
//                                   style={{ width: `${probability * 100}%` }}
//                                 />
//                               </div>
//                               <span className="text-sm">{(probability * 100).toFixed(1)}%</span>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center mt-6 bg-blue-50 p-4 rounded-lg">
//                   <Info className="h-5 w-5 text-blue-500 mr-2" />
//                   <p className="text-blue-700 text-sm">
//                     This analysis is provided for informational purposes only and should not replace professional medical advice. 
//                     Please consult with a healthcare provider for a proper diagnosis.
//                   </p>
//                 </div>

//                 <Button 
//                   type="button" 
//                   onClick={resetAnalysis} 
//                   className="w-full mt-6"
//                 >
//                   Analyze Another Image
//                 </Button>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default AnalysisPage;









//multiple images implemetation


// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDropzone } from "react-dropzone";
// import Webcam from "react-webcam";
// import { Button } from "../components/ui/button";
// import {
//   Camera,
//   Upload,
//   ArrowLeft,
//   X,
//   Image as ImageIcon,
//   Loader2,
//   Brain,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   ChevronDown,
//   ChevronUp,
//   Plus,
// } from "lucide-react";
// import { analyzeSkinImage, SkinAnalysisResult } from "../services/mlService";

// // For backend connectivity testing
// const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
// // For ML API connectivity
// const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';

// async function pingBackend(){
//   try {
//     const response = await fetch(BACKEND_URL);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.text();
//     console.log(json);
//     return json;
//   }
//   catch (error) {
//     console.error("Failed to ping backend:", error);
//     throw error;
//   }
// }

// async function pingMlApi() {
//   try {
//     const response = await fetch(`${ML_API_URL}/health`);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error("Failed to ping ML API:", error);
//     throw error;
//   }
// }

// function AnalysisPage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
//   const [images, setImages] = useState<string[]>([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState<(SkinAnalysisResult | null)[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
//   const webcamRef = React.useRef<Webcam>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     acceptedFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImages(prevImages => [...prevImages, reader.result as string]);
//         setResults(prevResults => [...prevResults, null]);
//       };
//       reader.readAsDataURL(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/jpeg": [],
//       "image/png": [],
//     },
//     // Remove maxFiles restriction to allow multiple uploads
//   });

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         setImages(prevImages => [...prevImages, imageSrc]);
//         setResults(prevResults => [...prevResults, null]);
//         setSelectedImageIndex(images.length);
//       } else {
//         setError("Failed to capture image. Please allow camera access.");
//       }
//     }
//   }, [webcamRef, images.length]);

//   const analyzeImage = async (index: number) => {
//     if (index >= images.length) return;

//     setIsAnalyzing(true);
//     setError(null);
//     setSelectedImageIndex(index);
    
//     try {
//       // First check if ML API is available
//       await pingMlApi();
      
//       // Analyze the image
//       const analysisResult = await analyzeSkinImage(images[index]);
      
//       // Update results array
//       setResults(prevResults => {
//         const newResults = [...prevResults];
//         newResults[index] = analysisResult;
//         return newResults;
//       });
//     } catch (err) {
//       console.error("Analysis error:", err);
//       setError("Unable to analyze the image. Please try again or check if ML service is running.");
      
//       // Try to ping backend as a fallback
//       try {
//         const backendResponse = await pingBackend();
//         console.log("Backend is available:", backendResponse);
//       } catch (backendErr) {
//         console.error("Backend is also unavailable:", backendErr);
//       }
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const analyzeAllImages = async () => {
//     setIsAnalyzing(true);
//     setError(null);
    
//     try {
//       // First check if ML API is available
//       await pingMlApi();
      
//       // Analyze all unanalyzed images
//       const newResults = [...results];
      
//       for (let i = 0; i < images.length; i++) {
//         if (!newResults[i]) {
//           try {
//             const analysisResult = await analyzeSkinImage(images[i]);
//             newResults[i] = analysisResult;
//           } catch (err) {
//             console.error(`Error analyzing image ${i}:`, err);
//           }
//         }
//       }
      
//       setResults(newResults);
      
//       // Select the first image after analysis
//       if (selectedImageIndex === null && images.length > 0) {
//         setSelectedImageIndex(0);
//       }
//     } catch (err) {
//       console.error("Analysis error:", err);
//       setError("Unable to analyze the images. Please try again or check if ML service is running.");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const removeImage = (indexToRemove: number) => {
//     setImages(images.filter((_, index) => index !== indexToRemove));
//     setResults(results.filter((_, index) => index !== indexToRemove));
    
//     if (selectedImageIndex !== null) {
//       if (indexToRemove === selectedImageIndex) {
//         // If we're removing the selected image, clear selection
//         setSelectedImageIndex(null);
//       } else if (indexToRemove < selectedImageIndex) {
//         // If we're removing an image before the selected one, adjust the index
//         setSelectedImageIndex(selectedImageIndex - 1);
//       }
//     }
//   };

//   const resetAnalysis = () => {
//     setImages([]);
//     setResults([]);
//     setSelectedImageIndex(null);
//     setError(null);
//     setExpandedSection(null);
//   };

//   const toggleSection = (section: string) => {
//     if (expandedSection === section) {
//       setExpandedSection(null);
//     } else {
//       setExpandedSection(section);
//     }
//   };

//   const getConfidenceColor = (confidence: number) => {
//     if (confidence >= 0.7) return "text-green-600";
//     if (confidence >= 0.4) return "text-yellow-600";
//     return "text-red-600";
//   };

//   // Function to render the current selected result
//   const renderResult = () => {
//     if (selectedImageIndex === null || selectedImageIndex >= results.length) {
//       return null;
//     }

//     const result = results[selectedImageIndex];
//     if (!result) {
//       return (
//         <div className="mt-6 text-center">
//           <Button 
//             type="button" 
//             onClick={() => analyzeImage(selectedImageIndex)} 
//             disabled={isAnalyzing} 
//             className="w-full mt-4"
//           >
//             {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
//             {isAnalyzing ? "Analyzing..." : "Analyze Image"}
//           </Button>
//         </div>
//       );
//     }

//     return (
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }}
//         className="mt-8 bg-gray-50 rounded-xl p-6"
//       >
//         <div className="flex items-center mb-4">
//           <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//           <h2 className="text-2xl font-semibold">Analysis Complete</h2>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium">Prediction</h3>
//             <span className={`font-semibold ${getConfidenceColor(result.confidence)}`}>
//               {(result.confidence * 100).toFixed(1)}% confidence
//             </span>
//           </div>
//           <p className="text-xl font-bold capitalize mt-2">{result.prediction.replace('_', ' ')}</p>
//           <p className="text-gray-600 mt-1">{result.details.description}</p>
//         </div>

//         {/* Treatment */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//           <button 
//             onClick={() => toggleSection('treatment')} 
//             className="w-full flex justify-between items-center"
//           >
//             <h3 className="text-lg font-medium">Treatment Options</h3>
//             {expandedSection === 'treatment' ? 
//               <ChevronUp className="h-5 w-5" /> : 
//               <ChevronDown className="h-5 w-5" />
//             }
//           </button>
          
//           {expandedSection === 'treatment' && (
//             <div className="mt-3 pl-2">
//               {result.details.treatment.length > 0 ? (
//                 <ul className="list-disc pl-5 space-y-1">
//                   {result.details.treatment.map((item, i) => (
//                     <li key={i} className="text-gray-700">{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600 italic">No treatment information available</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Next Steps */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//           <button 
//             onClick={() => toggleSection('next_steps')} 
//             className="w-full flex justify-between items-center"
//           >
//             <h3 className="text-lg font-medium">Recommended Next Steps</h3>
//             {expandedSection === 'next_steps' ? 
//               <ChevronUp className="h-5 w-5" /> : 
//               <ChevronDown className="h-5 w-5" />
//             }
//           </button>
          
//           {expandedSection === 'next_steps' && (
//             <div className="mt-3 pl-2">
//               {result.details.next_steps.length > 0 ? (
//                 <ul className="list-disc pl-5 space-y-1">
//                   {result.details.next_steps.map((item, i) => (
//                     <li key={i} className="text-gray-700">{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600 italic">No next steps information available</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Other Probabilities */}
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <button 
//             onClick={() => toggleSection('probabilities')} 
//             className="w-full flex justify-between items-center"
//           >
//             <h3 className="text-lg font-medium">All Probabilities</h3>
//             {expandedSection === 'probabilities' ? 
//               <ChevronUp className="h-5 w-5" /> : 
//               <ChevronDown className="h-5 w-5" />
//             }
//           </button>
          
//           {expandedSection === 'probabilities' && (
//             <div className="mt-3">
//               {Object.entries(result.probabilities)
//                 .sort(([, a], [, b]) => b - a)
//                 .map(([label, probability]) => (
//                   <div key={label} className="flex justify-between items-center mb-2">
//                     <span className="capitalize">{label.replace('_', ' ')}</span>
//                     <div className="flex items-center">
//                       <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
//                         <div 
//                           className="bg-blue-600 h-2.5 rounded-full" 
//                           style={{ width: `${probability * 100}%` }}
//                         />
//                       </div>
//                       <span className="text-sm">{(probability * 100).toFixed(1)}%</span>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center mt-6 bg-blue-50 p-4 rounded-lg">
//           <Info className="h-5 w-5 text-blue-500 mr-2" />
//           <p className="text-blue-700 text-sm">
//             This analysis is provided for informational purposes only and should not replace professional medical advice. 
//             Please consult with a healthcare provider for a proper diagnosis.
//           </p>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex items-center space-x-2 cursor-pointer"
//               onClick={() => navigate('/')}
//             >
//               <Camera className="h-8 w-8 text-blue-600" />
//               <span className="text-xl font-bold text-gray-900">SkinOCare AI</span>
//             </motion.div>
//             <div className="hidden md:flex space-x-6">
//               <Button variant="secondary" onClick={() => navigate('/about')}>About</Button>
//               <Button onClick={() => navigate('/analysis')}>Get Started</Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Skin Cancer Analysis</h1>

//             {images.length === 0 ? (
//               <>
//                 <div className="flex space-x-4 mb-6">
//                   <Button variant={activeTab === "upload" ? "primary" : "outline"} onClick={() => setActiveTab("upload")} className="flex-1">
//                     <Upload className="mr-2 h-5 w-5" />
//                     Upload Image
//                   </Button>
//                   <Button variant={activeTab === "camera" ? "primary" : "outline"} onClick={() => setActiveTab("camera")} className="flex-1">
//                     <Camera className="mr-2 h-5 w-5" />
//                     Use Camera
//                   </Button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   {activeTab === "upload" ? (
//                     <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                       <div
//                         {...getRootProps()}
//                         className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors h-80 flex flex-col items-center justify-center ${
//                           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
//                         }`}
//                       >
//                         <input {...getInputProps()} />
//                         <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
//                         <p className="text-lg text-gray-600">Drag and drop your images here, or click to select</p>
//                         <p className="text-sm text-gray-500 mt-3">Supported formats: JPEG, PNG</p>
//                         <p className="text-sm text-blue-600 font-medium mt-2">You can select multiple images</p>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded-xl" />
//                       <Button type="button" onClick={captureImage} className="mt-4 w-full">
//                         <Camera className="mr-2 h-5 w-5" />
//                         Capture Photo
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             ) : (
//               <>
//                 {/* Image gallery */}
//                 <div className="mb-6 overflow-x-auto pb-2">
//                   <div className="flex space-x-4">
//                     {images.map((img, index) => (
//                       <div 
//                         key={index}
//                         className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
//                           selectedImageIndex === index ? 'ring-4 ring-blue-500' : ''
//                         }`}
//                         onClick={() => setSelectedImageIndex(index)}
//                       >
//                         <img 
//                           src={img} 
//                           alt={`Uploaded image ${index + 1}`} 
//                           className="h-24 w-24 object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeImage(index);
//                           }}
//                           className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//                           title="Remove image"
//                           aria-label="Remove image"
//                         >
//                           <X className="h-4 w-4 text-gray-600" />
//                         </button>
//                         {results[index] && (
//                           <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white text-xs font-bold text-center py-1">
//                             Analyzed
//                           </div>
//                         )}
//                       </div>
//                     ))}
                    
//                     {/* Add more images button */}
//                     <div 
//                       {...getRootProps()}
//                       className="flex-shrink-0 h-24 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50"
//                     >
//                       <input {...getInputProps()} />
//                       <Plus className="h-8 w-8 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Selected image display */}
//                 {selectedImageIndex !== null && (
//                   <div className="relative mb-6">
//                     <img 
//                       src={images[selectedImageIndex]} 
//                       alt="Selected image" 
//                       className="w-full rounded-xl max-h-96 object-contain mx-auto"
//                     />
//                   </div>
//                 )}

//                 {/* Analyze all images button */}
//                 {images.length > 0 && results.some(r => r === null) && (
//                   <Button 
//                     type="button" 
//                     onClick={analyzeAllImages} 
//                     disabled={isAnalyzing} 
//                     className="w-full mb-4"
//                   >
//                     {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
//                     {isAnalyzing ? "Analyzing All Images..." : "Analyze All Images"}
//                   </Button>
//                 )}

//                 {/* Error display */}
//                 {error && (
//                   <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
//                     <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
//                     <div>{error}</div>
//                   </div>
//                 )}

//                 {/* Result or analyze button */}
//                 {selectedImageIndex !== null && renderResult()}

//                 {/* Reset button */}
//                 <div className="mt-6 flex justify-end">
//                   <Button 
//                     variant="outline"
//                     type="button" 
//                     onClick={resetAnalysis} 
//                     className="text-gray-600"
//                   >
//                     Start Over
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* Footer */}
//       {/* Footer */}
// <footer className="bg-gray-50 py-12 mt-10"> {/* Changed from py-12 mt-20 to py-8 mt-8 */}
//   <div className="container mx-auto px-4">
//     <div className="flex flex-col md:flex-row justify-between items-center">
//       <div 
//         className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer"
//         onClick={() => navigate('/')}
//       >
//         <Camera className="h-6 w-6 text-blue-600" />
//         <span className="text-lg font-semibold text-gray-900">SkinOCare AI</span>
//       </div>
//       <div className="text-gray-600 text-sm">
//         © 2025 SkinOCare AI. All rights reserved.
//       </div>
//     </div>
//   </div>
// </footer>
//     </div>
//   );
// }

// export default AnalysisPage;

















// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDropzone } from "react-dropzone";
// import Webcam from "react-webcam";
// import { Button } from "../components/ui/button";
// import {
//   Camera,
//   Upload,
//   ArrowLeft,
//   X,
//   Image as ImageIcon,
//   Loader2,
//   Brain,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   ChevronDown,
//   ChevronUp,
//   Plus,
//   Download,
// } from "lucide-react";
// import { analyzeSkinImage, SkinAnalysisResult } from "../services/mlService";
// import { jsPDF } from "jspdf";
// import 'jspdf-autotable';

// // For backend connectivity testing
// const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
// // For ML API connectivity
// const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';

// async function pingBackend(){
//   try {
//     const response = await fetch(BACKEND_URL);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.text();
//     console.log(json);
//     return json;
//   }
//   catch (error) {
//     console.error("Failed to ping backend:", error);
//     throw error;
//   }
// }

// async function pingMlApi() {
//   try {
//     const response = await fetch(`${ML_API_URL}/health`);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error("Failed to ping ML API:", error);
//     throw error;
//   }
// }

// function AnalysisPage() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
//   const [images, setImages] = useState<string[]>([]);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState<(SkinAnalysisResult | null)[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);
//   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
//   const webcamRef = React.useRef<Webcam>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     acceptedFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImages(prevImages => [...prevImages, reader.result as string]);
//         setResults(prevResults => [...prevResults, null]);
//       };
//       reader.readAsDataURL(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/jpeg": [],
//       "image/png": [],
//     },
//     // Remove maxFiles restriction to allow multiple uploads
//   });

//   const captureImage = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         setImages(prevImages => [...prevImages, imageSrc]);
//         setResults(prevResults => [...prevResults, null]);
//         setSelectedImageIndex(images.length);
//       } else {
//         setError("Failed to capture image. Please allow camera access.");
//       }
//     }
//   }, [webcamRef, images.length]);

//   const analyzeImage = async (index: number) => {
//     if (index >= images.length) return;

//     setIsAnalyzing(true);
//     setError(null);
//     setSelectedImageIndex(index);
    
//     try {
//       // First check if ML API is available
//       await pingMlApi();
      
//       // Analyze the image
//       const analysisResult = await analyzeSkinImage(images[index]);
      
//       // Update results array
//       setResults(prevResults => {
//         const newResults = [...prevResults];
//         newResults[index] = analysisResult;
//         return newResults;
//       });
//     } catch (err) {
//       console.error("Analysis error:", err);
//       setError("Unable to analyze the image. Please try again or check if ML service is running.");
      
//       // Try to ping backend as a fallback
//       try {
//         const backendResponse = await pingBackend();
//         console.log("Backend is available:", backendResponse);
//       } catch (backendErr) {
//         console.error("Backend is also unavailable:", backendErr);
//       }
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const analyzeAllImages = async () => {
//     setIsAnalyzing(true);
//     setError(null);
    
//     try {
//       // First check if ML API is available
//       await pingMlApi();
      
//       // Analyze all unanalyzed images
//       const newResults = [...results];
      
//       for (let i = 0; i < images.length; i++) {
//         if (!newResults[i]) {
//           try {
//             const analysisResult = await analyzeSkinImage(images[i]);
//             newResults[i] = analysisResult;
//           } catch (err) {
//             console.error(`Error analyzing image ${i}:`, err);
//           }
//         }
//       }
      
//       setResults(newResults);
      
//       // Select the first image after analysis
//       if (selectedImageIndex === null && images.length > 0) {
//         setSelectedImageIndex(0);
//       }
//     } catch (err) {
//       console.error("Analysis error:", err);
//       setError("Unable to analyze the images. Please try again or check if ML service is running.");
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const removeImage = (indexToRemove: number) => {
//     setImages(images.filter((_, index) => index !== indexToRemove));
//     setResults(results.filter((_, index) => index !== indexToRemove));
    
//     if (selectedImageIndex !== null) {
//       if (indexToRemove === selectedImageIndex) {
//         // If we're removing the selected image, clear selection
//         setSelectedImageIndex(null);
//       } else if (indexToRemove < selectedImageIndex) {
//         // If we're removing an image before the selected one, adjust the index
//         setSelectedImageIndex(selectedImageIndex - 1);
//       }
//     }
//   };

//   const resetAnalysis = () => {
//     setImages([]);
//     setResults([]);
//     setSelectedImageIndex(null);
//     setError(null);
//     setExpandedSection(null);
//   };

//   const toggleSection = (section: string) => {
//     if (expandedSection === section) {
//       setExpandedSection(null);
//     } else {
//       setExpandedSection(section);
//     }
//   };

//   const getConfidenceColor = (confidence: number) => {
//     if (confidence >= 0.7) return "text-green-600";
//     if (confidence >= 0.4) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const getFormattedDate = () => {
//     const now = new Date();
//     return now.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   const getFormattedTime = () => {
//     const now = new Date();
//     return now.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const generatePDF = async () => {
//     if (results.filter(r => r !== null).length === 0) {
//       setError("No analysis results to generate report. Please analyze at least one image.");
//       return;
//     }

//     setIsGeneratingPDF(true);

//     try {
//       // Create a new document
//       const doc = new jsPDF();
//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
      
//       // Add logo (this would be a base64 string of your logo)
//       // For now, we'll just add text as a placeholder
//       doc.setFontSize(22);
//       doc.setTextColor(0, 102, 204); // Blue color
//       doc.text("SkinOCare AI", 15, 20);
      
//       // Add date and time
//       doc.setFontSize(10);
//       doc.setTextColor(100, 100, 100); // Gray color
//       doc.text(`Date: ${getFormattedDate()}`, pageWidth - 60, 15);
//       doc.text(`Time: ${getFormattedTime()}`, pageWidth - 60, 20);
      
//       // Add title
//       doc.setFontSize(16);
//       doc.setTextColor(0, 0, 0);
//       doc.text("Skin Analysis Report", pageWidth / 2, 35, { align: 'center' });
      
//       // Add horizontal line
//       doc.setDrawColor(200, 200, 200);
//       doc.line(15, 40, pageWidth - 15, 40);
      
//       let yPos = 50;
      
//       // Add summary
//       doc.setFontSize(14);
//       doc.text("Analysis Summary", 15, yPos);
//       yPos += 10;
      
//       doc.setFontSize(10);
//       doc.text(`Total Images Analyzed: ${results.filter(r => r !== null).length}`, 15, yPos);
//       yPos += 10;
      
//       // Add detailed results for each image
//       for (let i = 0; i < images.length; i++) {
//         const result = results[i];
//         if (!result) continue;
        
//         // Check if we need a new page
//         if (yPos > pageHeight - 40) {
//           doc.addPage();
//           yPos = 20;
//         }
        
//         // Image number
//         doc.setFontSize(12);
//         doc.setTextColor(0, 102, 204);
//         doc.text(`Image ${i + 1}`, 15, yPos);
//         yPos += 7;
        
//         // Add small version of the image if possible
//         try {
//           doc.addImage(images[i], 'JPEG', 15, yPos, 40, 40);
//           yPos += 45;
//         } catch (err) {
//           console.error('Error adding image to PDF:', err);
//           // Continue without the image
//           yPos += 5;
//         }
        
//         // Prediction and confidence
//         doc.setFontSize(11);
//         doc.setTextColor(0, 0, 0);
//         doc.text(`Prediction: ${result.prediction.replace('_', ' ')}`, 15, yPos);
//         yPos += 5;
//         doc.text(`Confidence: ${(result.confidence * 100).toFixed(1)}%`, 15, yPos);
//         yPos += 10;
        
//         // Description
//         doc.setFontSize(10);
//         doc.text('Description:', 15, yPos);
//         yPos += 5;
        
//         // Split long text into lines
//         const description = doc.splitTextToSize(result.details.description, pageWidth - 30);
//         doc.text(description, 15, yPos);
//         yPos += description.length * 5 + 5;
        
//         // Check if we need a new page
//         if (yPos > pageHeight - 60) {
//           doc.addPage();
//           yPos = 20;
//         }
        
//         // Treatment
//         doc.setFontSize(10);
//         doc.text('Treatment Options:', 15, yPos);
//         yPos += 5;
        
//         result.details.treatment.forEach(item => {
//           const treatment = doc.splitTextToSize(`• ${item}`, pageWidth - 30);
//           doc.text(treatment, 15, yPos);
//           yPos += treatment.length * 5 + 2;
          
//           // Check if we need a new page
//           if (yPos > pageHeight - 20) {
//             doc.addPage();
//             yPos = 20;
//           }
//         });
        
//         yPos += 5;
        
//         // Check if we need a new page
//         if (yPos > pageHeight - 60) {
//           doc.addPage();
//           yPos = 20;
//         }
        
//         // Next steps
//         doc.text('Next Steps:', 15, yPos);
//         yPos += 5;
        
//         result.details.next_steps.forEach(item => {
//           const nextStep = doc.splitTextToSize(`• ${item}`, pageWidth - 30);
//           doc.text(nextStep, 15, yPos);
//           yPos += nextStep.length * 5 + 2;
          
//           // Check if we need a new page
//           if (yPos > pageHeight - 20) {
//             doc.addPage();
//             yPos = 20;
//           }
//         });
        
//         yPos += 15;
        
//         // Add horizontal line between images
//         if (i < images.length - 1) {
//           doc.setDrawColor(200, 200, 200);
//           doc.line(15, yPos - 5, pageWidth - 15, yPos - 5);
//         }
//       }
      
//       // Add disclaimer at the end
//       if (yPos > pageHeight - 40) {
//         doc.addPage();
//         yPos = 20;
//       }
      
//       doc.setDrawColor(200, 200, 200);
//       doc.line(15, yPos, pageWidth - 15, yPos);
//       yPos += 10;
      
//       doc.setFontSize(9);
//       doc.setTextColor(100, 100, 100);
//       doc.text('Disclaimer: This analysis is provided for informational purposes only and should not replace', 15, yPos);
//       yPos += 5;
//       doc.text('professional medical advice. Please consult with a healthcare provider for a proper diagnosis.', 15, yPos);
      
//       // Save the PDF
//       doc.save('SkinOCare_Analysis_Report.pdf');
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       setError('Failed to generate PDF report. Please try again.');
//     } finally {
//       setIsGeneratingPDF(false);
//     }
//   };

//   // Function to render the current selected result
//   const renderResult = () => {
//     if (selectedImageIndex === null || selectedImageIndex >= results.length) {
//       return null;
//     }

//     const result = results[selectedImageIndex];
//     if (!result) {
//       return (
//         <div className="mt-6 text-center">
//           <Button 
//             type="button" 
//             onClick={() => analyzeImage(selectedImageIndex)} 
//             disabled={isAnalyzing} 
//             className="w-full mt-4"
//           >
//             {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
//             {isAnalyzing ? "Analyzing..." : "Analyze Image"}
//           </Button>
//         </div>
//       );
//     }

//     return (
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }} 
//         animate={{ opacity: 1, y: 0 }}
//         className="mt-8 bg-gray-50 rounded-xl p-6"
//       >
//         <div className="flex items-center mb-4">
//           <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
//           <h2 className="text-2xl font-semibold">Analysis Complete</h2>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium">Prediction</h3>
//             <span className={`font-semibold ${getConfidenceColor(result.confidence)}`}>
//               {(result.confidence * 100).toFixed(1)}% confidence
//             </span>
//           </div>
//           <p className="text-xl font-bold capitalize mt-2">{result.prediction.replace('_', ' ')}</p>
//           <p className="text-gray-600 mt-1">{result.details.description}</p>
//         </div>

//         {/* Treatment */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//           <button 
//             onClick={() => toggleSection('treatment')} 
//             className="w-full flex justify-between items-center"
//           >
//             <h3 className="text-lg font-medium">Treatment Options</h3>
//             {expandedSection === 'treatment' ? 
//               <ChevronUp className="h-5 w-5" /> : 
//               <ChevronDown className="h-5 w-5" />
//             }
//           </button>
          
//           {expandedSection === 'treatment' && (
//             <div className="mt-3 pl-2">
//               {result.details.treatment.length > 0 ? (
//                 <ul className="list-disc pl-5 space-y-1">
//                   {result.details.treatment.map((item, i) => (
//                     <li key={i} className="text-gray-700">{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600 italic">No treatment information available</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Next Steps */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
//           <button 
//             onClick={() => toggleSection('next_steps')} 
//             className="w-full flex justify-between items-center"
//           >
//             <h3 className="text-lg font-medium">Recommended Next Steps</h3>
//             {expandedSection === 'next_steps' ? 
//               <ChevronUp className="h-5 w-5" /> : 
//               <ChevronDown className="h-5 w-5" />
//             }
//           </button>
          
//           {expandedSection === 'next_steps' && (
//             <div className="mt-3 pl-2">
//               {result.details.next_steps.length > 0 ? (
//                 <ul className="list-disc pl-5 space-y-1">
//                   {result.details.next_steps.map((item, i) => (
//                     <li key={i} className="text-gray-700">{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600 italic">No next steps information available</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Other Probabilities */}
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <button 
//             onClick={() => toggleSection('probabilities')} 
//             className="w-full flex justify-between items-center"
//           >
//             <h3 className="text-lg font-medium">All Probabilities</h3>
//             {expandedSection === 'probabilities' ? 
//               <ChevronUp className="h-5 w-5" /> : 
//               <ChevronDown className="h-5 w-5" />
//             }
//           </button>
          
//           {expandedSection === 'probabilities' && (
//             <div className="mt-3">
//               {Object.entries(result.probabilities)
//                 .sort(([, a], [, b]) => b - a)
//                 .map(([label, probability]) => (
//                   <div key={label} className="flex justify-between items-center mb-2">
//                     <span className="capitalize">{label.replace('_', ' ')}</span>
//                     <div className="flex items-center">
//                       <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
//                         <div 
//                           className="bg-blue-600 h-2.5 rounded-full" 
//                           style={{ width: `${probability * 100}%` }}
//                         />
//                       </div>
//                       <span className="text-sm">{(probability * 100).toFixed(1)}%</span>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center mt-6 bg-blue-50 p-4 rounded-lg">
//           <Info className="h-5 w-5 text-blue-500 mr-2" />
//           <p className="text-blue-700 text-sm">
//             This analysis is provided for informational purposes only and should not replace professional medical advice. 
//             Please consult with a healthcare provider for a proper diagnosis.
//           </p>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex items-center space-x-2 cursor-pointer"
//               onClick={() => navigate('/')}
//             >
//               <Camera className="h-8 w-8 text-blue-600" />
//               <span className="text-xl font-bold text-gray-900">SkinOCare AI</span>
//             </motion.div>
//             <div className="hidden md:flex space-x-6">
//               <Button variant="secondary" onClick={() => navigate('/about')}>About</Button>
//               <Button onClick={() => navigate('/analysis')}>Get Started</Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 py-8">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Skin Cancer Analysis</h1>

//             {images.length === 0 ? (
//               <>
//                 <div className="flex space-x-4 mb-6">
//                   <Button variant={activeTab === "upload" ? "primary" : "outline"} onClick={() => setActiveTab("upload")} className="flex-1">
//                     <Upload className="mr-2 h-5 w-5" />
//                     Upload Image
//                   </Button>
//                   <Button variant={activeTab === "camera" ? "primary" : "outline"} onClick={() => setActiveTab("camera")} className="flex-1">
//                     <Camera className="mr-2 h-5 w-5" />
//                     Use Camera
//                   </Button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   {activeTab === "upload" ? (
//                     <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                       <div
//                         {...getRootProps()}
//                         className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors h-80 flex flex-col items-center justify-center ${
//                           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
//                         }`}
//                       >
//                         <input {...getInputProps()} />
//                         <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
//                         <p className="text-lg text-gray-600">Drag and drop your images here, or click to select</p>
//                         <p className="text-sm text-gray-500 mt-3">Supported formats: JPEG, PNG</p>
//                         <p className="text-sm text-blue-600 font-medium mt-2">You can select multiple images</p>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
//                       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded-xl" />
//                       <Button type="button" onClick={captureImage} className="mt-4 w-full">
//                         <Camera className="mr-2 h-5 w-5" />
//                         Capture Photo
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </>
//             ) : (
//               <>
//                 {/* Image gallery */}
//                 <div className="mb-6 overflow-x-auto pb-2">
//                   <div className="flex space-x-4">
//                     {images.map((img, index) => (
//                       <div 
//                         key={index}
//                         className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
//                           selectedImageIndex === index ? 'ring-4 ring-blue-500' : ''
//                         }`}
//                         onClick={() => setSelectedImageIndex(index)}
//                       >
//                         <img 
//                           src={img} 
//                           alt={`Uploaded image ${index + 1}`} 
//                           className="h-24 w-24 object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeImage(index);
//                           }}
//                           className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//                           title="Remove image"
//                           aria-label="Remove image"
//                         >
//                           <X className="h-4 w-4 text-gray-600" />
//                         </button>
//                         {results[index] && (
//                           <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white text-xs font-bold text-center py-1">
//                             Analyzed
//                           </div>
//                         )}
//                       </div>
//                     ))}
                    
//                     {/* Add more images button */}
//                     <div 
//                       {...getRootProps()}
//                       className="flex-shrink-0 h-24 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50"
//                     >
//                       <input {...getInputProps()} />
//                       <Plus className="h-8 w-8 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Selected image display */}
//                 {selectedImageIndex !== null && (
//                   <div className="relative mb-6">
//                     <img 
//                       src={images[selectedImageIndex]} 
//                       alt="Selected image" 
//                       className="w-full rounded-xl max-h-96 object-contain mx-auto"
//                     />
//                   </div>
//                 )}

//                 {/* Analyze all images button */}
//                 {images.length > 0 && results.some(r => r === null) && (
//                   <Button 
//                     type="button" 
//                     onClick={analyzeAllImages} 
//                     disabled={isAnalyzing} 
//                     className="w-full mb-4"
//                   >
//                     {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
//                     {isAnalyzing ? "Analyzing All Images..." : "Analyze All Images"}
//                   </Button>
//                 )}

//                 {/* Error display */}
//                 {error && (
//                   <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
//                     <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
//                     <div>{error}</div>
//                   </div>
//                 )}

//                 {/* Result or analyze button */}
//                 {selectedImageIndex !== null && renderResult()}

//                 {/* Action buttons */}
//                 <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//                   <Button 
//                     variant="outline"
//                     type="button" 
//                     onClick={resetAnalysis} 
//                     className="text-gray-600 sm:w-auto w-full"
//                   >
//                     Start Over
//                   </Button>

//                   {/* Download Report Button */}
//                   {results.some(r => r !== null) && (
//                     <Button 
//                       type="button" 
//                       onClick={generatePDF} 
//                       disabled={isGeneratingPDF || isAnalyzing}
//                       className="bg-blue-600 hover:bg-blue-700 sm:w-auto w-full"
//                     >
//                       {isGeneratingPDF ? (
//                         <>
//                           <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                           Generating Report...
//                         </>
//                       ) : (
//                         <>
//                           <Download className="mr-2 h-5 w-5" />
//                           Download Report
//                         </>
//                       )}
//                     </Button>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-50 py-12 mt-10">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div 
//               className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer"
//               onClick={() => navigate('/')}
//             >
//               <Camera className="h-6 w-6 text-blue-600" />
//               <span className="text-lg font-semibold text-gray-900">SkinOCare AI</span>
//             </div>
//             <div className="text-gray-600 text-sm">
//               © 2025 SkinOCare AI. All rights reserved.
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default AnalysisPage;





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
  AlertCircle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  Download,
} from "lucide-react";
import { analyzeSkinImage, SkinAnalysisResult } from "../services/mlService";
import { generateAnalysisReport } from "../utils/pdfGenerator";

// For backend connectivity testing
const BACKEND_URL = import.meta.env.VITE_BACK_END_URL;
// For ML API connectivity
const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5001';

async function pingBackend(){
  try {
    const response = await fetch(BACKEND_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.text();
    console.log(json);
    return json;
  }
  catch (error) {
    console.error("Failed to ping backend:", error);
    throw error;
  }
}

async function pingMlApi() {
  try {
    const response = await fetch(`${ML_API_URL}/health`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Failed to ping ML API:", error);
    throw error;
  }
}

function AnalysisPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<(SkinAnalysisResult | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prevImages => [...prevImages, reader.result as string]);
        setResults(prevResults => [...prevResults, null]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    // Remove maxFiles restriction to allow multiple uploads
  });

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImages(prevImages => [...prevImages, imageSrc]);
        setResults(prevResults => [...prevResults, null]);
        setSelectedImageIndex(images.length);
      } else {
        setError("Failed to capture image. Please allow camera access.");
      }
    }
  }, [webcamRef, images.length]);

  const analyzeImage = async (index: number) => {
    if (index >= images.length) return;

    setIsAnalyzing(true);
    setError(null);
    setSelectedImageIndex(index);
    
    try {
      // First check if ML API is available
      await pingMlApi();
      
      // Analyze the image
      const analysisResult = await analyzeSkinImage(images[index]);
      
      // Update results array
      setResults(prevResults => {
        const newResults = [...prevResults];
        newResults[index] = analysisResult;
        return newResults;
      });
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Unable to analyze the image. Please try again or check if ML service is running.");
      
      // Try to ping backend as a fallback
      try {
        const backendResponse = await pingBackend();
        console.log("Backend is available:", backendResponse);
      } catch (backendErr) {
        console.error("Backend is also unavailable:", backendErr);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeAllImages = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // First check if ML API is available
      await pingMlApi();
      
      // Analyze all unanalyzed images
      const newResults = [...results];
      
      for (let i = 0; i < images.length; i++) {
        if (!newResults[i]) {
          try {
            const analysisResult = await analyzeSkinImage(images[i]);
            newResults[i] = analysisResult;
          } catch (err) {
            console.error(`Error analyzing image ${i}:`, err);
          }
        }
      }
      
      setResults(newResults);
      
      // Select the first image after analysis
      if (selectedImageIndex === null && images.length > 0) {
        setSelectedImageIndex(0);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Unable to analyze the images. Please try again or check if ML service is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (results.filter(r => r !== null).length === 0) {
      setError("No analysis results to generate report. Please analyze at least one image.");
      return;
    }

    setIsGeneratingPDF(true);
    setError(null);

    try {
      await generateAnalysisReport({ images, results });
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF report. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
    setResults(results.filter((_, index) => index !== indexToRemove));
    
    if (selectedImageIndex !== null) {
      if (indexToRemove === selectedImageIndex) {
        // If we're removing the selected image, clear selection
        setSelectedImageIndex(null);
      } else if (indexToRemove < selectedImageIndex) {
        // If we're removing an image before the selected one, adjust the index
        setSelectedImageIndex(selectedImageIndex - 1);
      }
    }
  };

  const resetAnalysis = () => {
    setImages([]);
    setResults([]);
    setSelectedImageIndex(null);
    setError(null);
    setExpandedSection(null);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return "text-green-600";
    if (confidence >= 0.4) return "text-yellow-600";
    return "text-red-600";
  };

  // Function to render the current selected result
  const renderResult = () => {
    if (selectedImageIndex === null || selectedImageIndex >= results.length) {
      return null;
    }

    const result = results[selectedImageIndex];
    if (!result) {
      return (
        <div className="mt-6 text-center">
          <Button 
            type="button" 
            onClick={() => analyzeImage(selectedImageIndex)} 
            disabled={isAnalyzing} 
            className="w-full mt-4"
          >
            {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
            {isAnalyzing ? "Analyzing..." : "Analyze Image"}
          </Button>
        </div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-gray-50 rounded-xl p-6"
      >
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          <h2 className="text-2xl font-semibold">Analysis Complete</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Prediction</h3>
            <span className={`font-semibold ${getConfidenceColor(result.confidence)}`}>
              {(result.confidence * 100).toFixed(1)}% confidence
            </span>
          </div>
          <p className="text-xl font-bold capitalize mt-2">{result.prediction.replace('_', ' ')}</p>
          <p className="text-gray-600 mt-1">{result.details.description}</p>
        </div>

        {/* Treatment */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <button 
            onClick={() => toggleSection('treatment')} 
            className="w-full flex justify-between items-center"
          >
            <h3 className="text-lg font-medium">Treatment Options</h3>
            {expandedSection === 'treatment' ? 
              <ChevronUp className="h-5 w-5" /> : 
              <ChevronDown className="h-5 w-5" />
            }
          </button>
          
          {expandedSection === 'treatment' && (
            <div className="mt-3 pl-2">
              {result.details.treatment.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {result.details.treatment.map((item, i) => (
                    <li key={i} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No treatment information available</p>
              )}
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <button 
            onClick={() => toggleSection('next_steps')} 
            className="w-full flex justify-between items-center"
          >
            <h3 className="text-lg font-medium">Recommended Next Steps</h3>
            {expandedSection === 'next_steps' ? 
              <ChevronUp className="h-5 w-5" /> : 
              <ChevronDown className="h-5 w-5" />
            }
          </button>
          
          {expandedSection === 'next_steps' && (
            <div className="mt-3 pl-2">
              {result.details.next_steps.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {result.details.next_steps.map((item, i) => (
                    <li key={i} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No next steps information available</p>
              )}
            </div>
          )}
        </div>

        {/* Other Probabilities */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <button 
            onClick={() => toggleSection('probabilities')} 
            className="w-full flex justify-between items-center"
          >
            <h3 className="text-lg font-medium">All Probabilities</h3>
            {expandedSection === 'probabilities' ? 
              <ChevronUp className="h-5 w-5" /> : 
              <ChevronDown className="h-5 w-5" />
            }
          </button>
          
          {expandedSection === 'probabilities' && (
            <div className="mt-3">
              {Object.entries(result.probabilities)
                .sort(([, a], [, b]) => b - a)
                .map(([label, probability]) => (
                  <div key={label} className="flex justify-between items-center mb-2">
                    <span className="capitalize">{label.replace('_', ' ')}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${probability * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{(probability * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex items-center mt-6 bg-blue-50 p-4 rounded-lg">
          <Info className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-blue-700 text-sm">
            This analysis is provided for informational purposes only and should not replace professional medical advice. 
            Please consult with a healthcare provider for a proper diagnosis.
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkinOCare AI</span>
            </motion.div>
            <div className="hidden md:flex space-x-6">
              <Button variant="secondary" onClick={() => navigate('/about')}>About</Button>
              <Button onClick={() => navigate('/analysis')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Skin Cancer Analysis</h1>

            {images.length === 0 ? (
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
                        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors h-80 flex flex-col items-center justify-center ${
                          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                        <p className="text-lg text-gray-600">Drag and drop your images here, or click to select</p>
                        <p className="text-sm text-gray-500 mt-3">Supported formats: JPEG, PNG</p>
                        <p className="text-sm text-blue-600 font-medium mt-2">You can select multiple images</p>
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
              <>
                {/* Image gallery */}
                <div className="mb-6 overflow-x-auto pb-2">
                  <div className="flex space-x-4">
                    {images.map((img, index) => (
                      <div 
                        key={index}
                        className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden ${
                          selectedImageIndex === index ? 'ring-4 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img 
                          src={img} 
                          alt={`Uploaded image ${index + 1}`} 
                          className="h-24 w-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                          title="Remove image"
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4 text-gray-600" />
                        </button>
                        {results[index] && (
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white text-xs font-bold text-center py-1">
                            Analyzed
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Add more images button */}
                    <div 
                      {...getRootProps()}
                      className="flex-shrink-0 h-24 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50"
                    >
                      <input {...getInputProps()} />
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Selected image display */}
                {selectedImageIndex !== null && (
                  <div className="relative mb-6">
                    <img 
                      src={images[selectedImageIndex]} 
                      alt="Selected image" 
                      className="w-full rounded-xl max-h-96 object-contain mx-auto"
                    />
                  </div>
                )}

                {/* Analyze all images button */}
                {images.length > 0 && results.some(r => r === null) && (
                  <Button 
                    type="button" 
                    onClick={analyzeAllImages} 
                    disabled={isAnalyzing} 
                    className="w-full mb-4"
                  >
                    {isAnalyzing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Brain className="mr-2 h-5 w-5" />}
                    {isAnalyzing ? "Analyzing All Images..." : "Analyze All Images"}
                  </Button>
                )}

                {/* Error display */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>{error}</div>
                  </div>
                )}

                {/* Result or analyze button */}
                {selectedImageIndex !== null && renderResult()}

                {/* Action buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Button 
                    variant="outline"
                    type="button" 
                    onClick={resetAnalysis} 
                    className="text-gray-600 sm:w-auto w-full"
                  >
                    Start Over
                  </Button>

                  {/* Download Report Button */}
                  {results.some(r => r !== null) && (
                    <Button 
                      type="button" 
                      onClick={handleGeneratePDF} 
                      disabled={isGeneratingPDF || isAnalyzing}
                      className="bg-blue-600 hover:bg-blue-700 sm:w-auto w-full"
                    >
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Download Report
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-10">
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

export default AnalysisPage;