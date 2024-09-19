"use client";

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../styless/About.module.css';

const ValuesPage = () => {
  const valuesContent = {
    title: "Our Values",
    content: "Our core values guide every decision we make and every service we provide. They are the foundation of our commitment to excellence and customer satisfaction.",
    list: [
      "Integrity in all our dealings",
      "Commitment to sustainability",
      "Continuous improvement",
      "Community engagement"
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
        {valuesContent.title}
      </motion.h1>

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{valuesContent.title}</h2>
        <p>{valuesContent.content}</p>
        <ul className={styles.checkList}>
          {valuesContent.list.map((item, index) => (
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

export default ValuesPage;
