import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnalysisPage from './pages/AnalysisPage';
import AboutPage from "./pages/AboutPage";
import CancerInfoPage from './pages/CancerInfoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/cancer-info" element={<CancerInfoPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;