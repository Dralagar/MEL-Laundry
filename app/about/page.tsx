"use client"; 
import React, { useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { FaCheckCircle } from 'react-icons/fa'; 
import styles from '../styless/About.module.css'; // Ensure the correct path for styles

// Define the component
const AboutPage: React.FC = () => { 
  const [activeTab, setActiveTab] = useState('mission');

  // Tab content
  const tabContent = { 
    mission: { 
      title: "Our Mission", 
      content: "At MEL Laundry, we're committed to revolutionizing the laundry experience. We aim to provide convenient, eco-friendly, and affordable laundry solutions that give our customers more time for what matters most in their lives.",
      list: [ 
        "Convenience at your fingertips", 
        "Eco-friendly practices", 
        "Affordable pricing", 
        "Cutting-edge technology" 
      ]
    },
    vision: { 
      title: "Our Vision", 
      content: "We envision a future where laundry is no longer a chore but a seamless part of modern living. MEL Laundry strives to be at the forefront of laundry innovation, setting new standards for efficiency and customer satisfaction.",
      list: [ 
        "Industry leader in innovation", 
        "Nationwide presence", 
        "Customer-centric approach", 
        "Sustainable business model" 
      ]
    },
    values: { 
      title: "Our Values", 
      content: "Our core values guide every decision we make and every service we provide. They are the foundation of our commitment to excellence and customer satisfaction.",
      list: [ 
        "Integrity in all our dealings", 
        "Commitment to sustainability", 
        "Continuous improvement", 
        "Community engagement" 
      ]
    }
  };

  return ( 
    <div className={styles.container}>
      <motion.h1 
        className={styles.title} 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        About MEL Laundry
      </motion.h1>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
            onMouseEnter={() => setActiveTab(tab)}
          >
            {tabContent[tab].title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div 
        className={styles.content}
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{tabContent[activeTab].title}</h2>
        <p>{tabContent[activeTab].content}</p>
        <ul className={styles.checkList}>
          {tabContent[activeTab].list.map((item, index) => (
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

      {/* Image Grid */}
      <div className={styles.imageGrid}>
        <motion.img 
          src="/images/washer.png" 
          alt="MEL Laundry Facility" 
          className={styles.gridImage}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img 
          src="/images/wash.png" 
          alt="Eco-friendly Washing Machines" 
          className={styles.gridImage}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img 
          src="/images/dryer.png" 
          alt="Happy Customer" 
          className={styles.gridImage}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img 
          src="/images/degree.png" 
          alt="MEL Laundry Team" 
          className={styles.gridImage}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default AboutPage;
