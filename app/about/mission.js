"use client";

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../styless/About.module.css';

const MissionPage = () => {
  const missionContent = {
    title: "Our Mission",
    content: "At MEL Laundry, we're committed to revolutionizing the laundry experience. We aim to provide convenient, eco-friendly, and affordable laundry solutions that give our customers more time for what matters most in their lives.",
    list: [
      "Convenience at your fingertips",
      "Eco-friendly practices",
      "Affordable pricing",
      "Cutting-edge technology"
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
        {missionContent.title}
      </motion.h1>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{missionContent.title}</h2>
        <p>{missionContent.content}</p>
        <ul className={styles.checkList}>
          {missionContent.list.map((item, index) => (
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

export default MissionPage;
