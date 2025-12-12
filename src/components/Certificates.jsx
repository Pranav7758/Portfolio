import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { PiCertificateBold } from "react-icons/pi";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: "Generative AI Literacy",
      issuer: "IT-ITeS SSC Nasscom",
      date: "Dec 2025",
      image: "/assets/certificates/generative-ai-literacy.pdf",
      badge: "Certified",
      skills: ["Generative AI", "AI Literacy", "IT-ITeS"],
      isPdf: true,
    },
    {
      id: 2,
      title: "Introduction to Large Language Models (LLMs)",
      issuer: "NPTEL - IIT Madras",
      date: "Jul-Oct 2025",
      image: "/assets/certificates/nptel-llm.jpg",
      badge: "Elite",
      skills: ["LLMs", "AI", "Machine Learning"],
    },
    {
      id: 3,
      title: "Full-Stack JavaScript Development",
      issuer: "LinkedIn Learning",
      date: "Mar 2025",
      image: "/assets/certificates/linkedin-fullstack.png",
      badge: "Completed",
      skills: ["MongoDB", "Node.js", "React"],
    },
    {
      id: 4,
      title: "HTML Essential Training",
      issuer: "LinkedIn Learning",
      date: "Mar 2025",
      image: "/assets/certificates/linkedin-html.png",
      badge: "Completed",
      skills: ["HTML", "Web Development"],
    },
  ];

  return (
    <div className="mt-10 lg:mt-20 px-5 lg:px-28" id="certificates">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-2xl lg:text-4xl">
          My <span className="font-extrabold">Certificates</span>
        </h2>
        <p className="text-[#71717A] mt-2 text-sm lg:text-base">
          Professional certifications and courses I've completed
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white border-2 border-black rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setSelectedCert(cert)}
          >
            <div className="relative overflow-hidden">
              {cert.isPdf ? (
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <PiCertificateBold className="text-6xl text-gray-600" />
                </div>
              ) : (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute top-3 right-3">
                <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {cert.badge}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start gap-2">
                <PiCertificateBold className="text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm lg:text-base leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-[#71717A] text-sm mt-1">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <IoClose size={24} />
              </button>
              {selectedCert.isPdf ? (
                <div className="p-8 text-center">
                  <PiCertificateBold className="text-8xl text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{selectedCert.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedCert.issuer}</p>
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <HiOutlineExternalLink size={20} />
                    View Certificate
                  </a>
                </div>
              ) : (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
