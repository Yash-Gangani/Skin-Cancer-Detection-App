import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

const contributors = [
  { name: "Yash Gangani", image: "/yash.jpg", role: "ML Researcher" },
  { name: "Zarana Jodhani", image: "/zarana.jpg", role: "DevOps Engineer" },
  { name: "Shlok Kadakia", image: "/shlok.jpg", role: "Frontend Developer" },
  { name: "John Smillie", image: "/john.jpg", role: "ML Researcher" },
  { name: "JayaLaksmi", image: "/shlok.jpg", role: "AI Researcher" },
  { name: "Ashutosh Bhalala", image: "/ashutosh.jpg", role: "Backend Developer" },
];

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
          {/* <h1 className="text-2xl font-bold text-gray-900">Our Team</h1> */}
        </div>
      </nav>

      {/* Contributors Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900">Meet Our Contributors</h2>
          <p className="text-gray-600 text-lg mt-4">
            The brilliant minds behind SkinOCare AI, dedicated to revolutionizing skin health through AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all text-center relative"
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md border-2 border-gray-200 transition-all duration-300">
                <motion.img
                  src={contributor.image}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">{contributor.name}</h3>
              <p className="text-gray-600">{contributor.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
