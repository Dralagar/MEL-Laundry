"use client";

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../styless/About.module.css';

const VisionPage = () => {
  const visionContent = {
    title: "Our Vision",
    content: "We envision a future where laundry is no longer a chore but a seamless part of modern living. MEL Laundry strives to be at the forefront of laundry innovation, setting new standards for efficiency and customer satisfaction.",
    list: [
      "Industry leader in innovation",
      "Nationwide presence",
      "Customer-centric approach",
      "Sustainable business model"
    ]
  };

  return (
    <div className={styles.container}>
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {visionContent.title}
      </motion.h1>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{visionContent.title}</h2>
        <p>{visionContent.content}</p>
        <ul className={styles.checkList}>
          {visionContent.list.map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FaCheckCircle className={styles.checkIcon} /> {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default VisionPage;
