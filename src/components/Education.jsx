import React from "react";
import { motion } from "framer-motion";
import { IoSchoolOutline } from "react-icons/io5";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

export default function Education() {
  const education = [
    {
      id: 1,
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Sanjivani University",
      location: "Kopargaon, India",
      duration: "Aug 2024 – Ongoing",
      status: "current",
      marks: "CGPA: 8.12",
    },
    {
      id: 2,
      degree: "Diploma in Computer Science and Engineering",
      institution: "K.B.H. Polytechnic",
      location: "Malegaon, India",
      duration: "July 2021 – July 2024",
      status: "completed",
      marks: "87%",
    },
  ];

  return (
    <div className="mt-10 lg:mt-20 px-5 lg:px-28" id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-2xl lg:text-4xl">
          My <span className="font-extrabold">Education</span>
        </h2>
        <p className="text-[#71717A] mt-2 text-sm lg:text-base">
          My academic journey and qualifications
        </p>
      </motion.div>

      <div className="mt-10 max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-12 lg:pl-16 pb-10 last:pb-0"
            >
              <div className={`absolute left-0 lg:left-2 top-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
                edu.status === "current" ? "bg-black" : "bg-gray-200"
              }`}>
                <IoSchoolOutline className={`text-lg lg:text-xl ${
                  edu.status === "current" ? "text-white" : "text-gray-600"
                }`} />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white border-2 border-black rounded-lg p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base lg:text-lg">{edu.degree}</h3>
                    <p className="text-black font-semibold mt-1">{edu.institution}</p>
                  </div>
                  {edu.status === "current" ? (
                    <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                      Ongoing
                    </span>
                  ) : (
                    <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                      Completed
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#71717A]">
                  <div className="flex items-center gap-1">
                    <HiOutlineLocationMarker className="text-base" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiOutlineCalendar className="text-base" />
                    <span>{edu.duration}</span>
                  </div>
                </div>
                {edu.marks && (
                  <div className="mt-3">
                    <span className="text-green-600 font-bold text-base">{edu.marks}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
