import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnalysisPage from './pages/AnalysisPage';
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;