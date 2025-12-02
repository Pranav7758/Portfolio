import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiExpress, SiMongodb, SiMysql, SiCplusplus, SiSpringboot } from "react-icons/si";
import { BsGit } from "react-icons/bs";
import { TbApi } from "react-icons/tb";

export default function Skills() {
  const [skills] = useState([
    { id: 1, name: "JavaScript", icon: <FaJs size={50} /> },
    { id: 2, name: "React.js", icon: <FaReact size={50} /> },
    { id: 3, name: "Node.js", icon: <FaNodeJs size={50} /> },
    { id: 4, name: "Express.js", icon: <SiExpress size={50} /> },
    { id: 5, name: "MongoDB", icon: <SiMongodb size={50} /> },
    { id: 6, name: "C++", icon: <SiCplusplus size={50} /> },
    { id: 7, name: "Python", icon: <FaPython size={50} /> },
    { id: 8, name: "MySQL", icon: <SiMysql size={50} /> },
    { id: 9, name: "HTML5", icon: <FaHtml5 size={50} /> },
    { id: 10, name: "CSS3", icon: <FaCss3Alt size={50} /> },
    { id: 11, name: "Git", icon: <BsGit size={50} /> },
    { id: 12, name: "REST API", icon: <TbApi size={50} /> },
  ]);

  const [experiences] = useState([
    {
      id: 1,
      company: "Sanjivani University",
      role: "Full Stack Intern - Vistara ERP Project",
      period: "Oct 2025 - Present",
      location: "Kopargaon, India",
      description:
        "Working with a small team to develop an internal ERP system for managing academic and administrative operations. Collaborating on backend services using Node.js and MongoDB with a focus on scalability and maintainability. Building and testing modules for faculty and student management, integrating authentication, dashboards, and real-time data flow.",
    },
    {
      id: 2,
      company: "HCL Technologies",
      role: "Software Development Trainee",
      period: "May 2025 - July 2025",
      location: "Remote",
      description:
        "Learned to design secure, scalable web applications using Spring Boot, Angular, and MySQL. Implemented CRUD-based modules and improved understanding of backend logic and client-server architecture. Gained hands-on experience with enterprise software development practices.",
    },
  ]);

  return (
    <div className="mt-3 lg:mt-16" id="skills">
      <div className="px-5 lg:px-28">

        <motion.h2
          className="text-2xl lg:text-4xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My <span className="font-extrabold">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 text-lg font-bold mt-7 lg:mt-16 w-full place-items-center gap-y-6 lg:gap-y-12">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="bg-white border-2 hover:bg-black hover:text-white transition-all cursor-pointer border-black rounded p-3 h-36 w-36 lg:h-40 lg:w-40 flex flex-col items-center justify-center gap-5"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: skill.id * 0.05 }}
              viewport={{ once: true }}
            >
              {skill.icon}
              <p className="text-sm">{skill.name}</p>
            </motion.div>
          ))}
        </div>

      </div>

      <div className="bg-black w-full my-8 py-8 lg:my-16 lg:py-16">
        <motion.h2
          className="text-2xl lg:text-4xl text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My <span className="font-extrabold">Experience</span>
        </motion.h2>

        <div className="px-5 lg:px-28 my-8 lg:mt-16 space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="bg-black p-5 border border-[#D4D4D8] rounded-md hover:bg-[#27272A] transition-all cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between flex-col items-start lg:flex-row lg:items-center">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {exp.company.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-lg lg:text-xl">
                      {exp.role}
                    </h2>
                    <p className="text-[#A1A1AA] text-sm">{exp.company} | {exp.location}</p>
                  </div>
                </div>
                <span className="text-[#D4D4D8] font-semibold text-sm mt-4 lg:mt-0 lg:text-base">
                  {exp.period}
                </span>
              </div>
              <p className="text-[#D4D4D8] mt-6 text-sm/6 lg:text-base font-light">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
