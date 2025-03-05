import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { SkinAnalysisResult } from "../services/mlService";

export interface GeneratePDFParams {
  images: string[];
  results: (SkinAnalysisResult | null)[];
}


export const generateAnalysisReport = async ({ images, results }: GeneratePDFParams): Promise<void> => {
  const validResults = results.filter((r, i) => r !== null && i < images.length) as SkinAnalysisResult[];
  const validImages = images.filter((_, i) => results[i] !== null);
  
  if (validResults.length === 0) {
    throw new Error("No valid analysis results to generate report");
  }

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    doc.setFontSize(22);
    doc.setTextColor(0, 102, 204); 
    doc.text("SkinOCare AI", 15, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); 
    doc.text(`Date: ${getFormattedDate()}`, pageWidth - 60, 15);
    doc.text(`Time: ${getFormattedTime()}`, pageWidth - 60, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Skin Cancer Analysis Report", pageWidth / 2, 35, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 40, pageWidth - 15, 40);
    
    let yPos = 50;
    
    doc.setFontSize(14);
    doc.text("Analysis Summary", 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.text(`Total Images Analyzed: ${validResults.length}`, 15, yPos);
    yPos += 10;
    
    for (let i = 0; i < validImages.length; i++) {
      const result = validResults[i];
      if (!result) continue;
      
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 102, 204);
      doc.text(`Image ${i + 1}`, 15, yPos);
      yPos += 7;
      
      try {
        doc.addImage(validImages[i], 'JPEG', 15, yPos, 40, 40);
        yPos += 45;
      } catch (err) {
        console.error('Error adding image to PDF:', err);
        yPos += 5;
      }
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Prediction: ${result.prediction.replace('_', ' ')}`, 15, yPos);
      yPos += 5;
      doc.text(`Confidence: ${(result.confidence * 100).toFixed(1)}%`, 15, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.text('Description:', 15, yPos);
      yPos += 5;
      
      const description = doc.splitTextToSize(result.details.description, pageWidth - 30);
      doc.text(description, 15, yPos);
      yPos += description.length * 5 + 5;
      
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(10);
      doc.text('Treatment Options:', 15, yPos);
      yPos += 5;
      
      result.details.treatment.forEach(item => {
        const treatment = doc.splitTextToSize(`• ${item}`, pageWidth - 30);
        doc.text(treatment, 15, yPos);
        yPos += treatment.length * 5 + 2;
        
        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }
      });
      
      yPos += 5;
      
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text('Next Steps:', 15, yPos);
      yPos += 5;
      
      result.details.next_steps.forEach(item => {
        const nextStep = doc.splitTextToSize(`• ${item}`, pageWidth - 30);
        doc.text(nextStep, 15, yPos);
        yPos += nextStep.length * 5 + 2;
        
        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }
      });
      
      yPos += 15;
      
      if (i < validImages.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(15, yPos - 5, pageWidth - 15, yPos - 5);
      }
    }
    
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setDrawColor(200, 200, 200);
    doc.line(15, yPos, pageWidth - 15, yPos);
    yPos += 10;
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Disclaimer: This analysis is provided for informational purposes only and should not replace', 15, yPos);
    yPos += 5;
    doc.text('professional medical advice. Please consult with a healthcare provider for a proper diagnosis.', 15, yPos);
    
    // Save the PDF
    doc.save('SkinOCare_Analysis_Report.pdf');
  } catch (err) {
    console.error('Error generating PDF:', err);
    throw new Error('Failed to generate PDF report');
  }
};

// Helper functions
const getFormattedDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const getFormattedTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
};