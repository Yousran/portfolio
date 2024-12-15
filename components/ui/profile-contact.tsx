"use client";
import React from 'react';
import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion';

const ProfileContact = () => {
  return (
    <div className='flex justify-center gap-4'>
      <motion.a
        href="https://github.com/Yousran"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <i className='bx bxl-github text-3xl'></i>
      </motion.a>
      <motion.a
        href="https://www.linkedin.com/in/yousranmz/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <i className='bx bxl-linkedin text-3xl'></i>
      </motion.a>
      <motion.a
        href="mailto:yusranmazidan@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <i className='bx bxl-gmail text-3xl'></i>
      </motion.a>
      <motion.a
        href="https://www.instagram.com/yousran_mz/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <i className='bx bxl-instagram text-3xl'></i>
      </motion.a>
      <motion.a
        href="https://wa.me/+6285156378360"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <i className='bx bxl-whatsapp text-3xl'></i>
      </motion.a>
    </div>
  );
};

export default ProfileContact;