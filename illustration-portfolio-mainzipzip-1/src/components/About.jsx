import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-5 lg:px-28 flex justify-between flex-col lg:flex-row" id="about">
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img src="/assets/about-me.svg" alt="About Me Illustration" />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          About <span className="font-extrabold">Me</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">
          I'm a Computer Science student at Sanjivani University pursuing B.Tech in Computer Science and Engineering. I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js) and love building responsive, user-friendly web applications.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          My technical journey includes hands-on experience with C++, JavaScript, Python, and various web technologies. I'm currently working as a Full Stack Intern on the Vistara ERP Project at Sanjivani University, where I collaborate on building internal systems for academic and administrative operations.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          I've participated in prestigious hackathons like the IIT Guwahati Micromouse Maze Hackathon and Smart India Hackathon (SIH), focusing on hardware and software integration. Feel free to connect with me on LinkedIn or check out my projects on GitHub.
        </p>
      </motion.div>
    </div>
  );
}
