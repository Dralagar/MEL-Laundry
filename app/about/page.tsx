"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../styless/About.module.css';

interface TabContent {
  title: string;
  content: string;
  list: string[];
}

interface AboutPageProps {
  tab?: 'mission' | 'vision' | 'values'; // Optional prop with specific string values
}

const AboutPage: React.FC<AboutPageProps> = ({ tab = 'mission' }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>(tab);

  useEffect(() => {
    if (tab && ['mission', 'vision', 'values'].includes(tab)) {
      setActiveTab(tab as 'mission' | 'vision' | 'values');
    }
  }, [tab]);

  const tabContent: Record<'mission' | 'vision' | 'values', TabContent> = {
    mission: {
      title: "Our Mission",
      content: "At MEL Laundry, we're committed to revolutionizing the laundry experience.",
      list: [
        "Convenience at your fingertips",
        "Eco-friendly practices",
        "Affordable pricing",
        "Cutting-edge technology"
      ]
    },
    vision: {
      title: "Our Vision",
      content: "We envision a future where laundry is no longer a chore.",
      list: [
        "Industry leader in innovation",
        "Nationwide presence",
        "Customer-centric approach",
        "Sustainable business model"
      ]
    },
    values: {
      title: "Our Values",
      content: "Our core values guide every decision we make.",
      list: [
        "Integrity in all our dealings",
        "Commitment to sustainability",
        "Continuous improvement",
        "Community engagement"
      ]
    }
  };

  const images = [
    "/images/redwhite.png", 
    "/images/iron.jpg",
    "/images/shirt.png",
    "/images/whiteshit.png",
  ];

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

      <div className={styles.tabContainer}>
        {Object.keys(tabContent).map((tabKey) => (
          <button
            key={tabKey}
            className={`${styles.tabButton} ${activeTab === tabKey ? styles.activeTab : ''}`}
            onClick={() => router.push(`/about/${tabKey}`)}
          >
            {tabContent[tabKey as keyof typeof tabContent].title}
          </button>
        ))}
      </div>

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

      <div className={styles.imageGrid}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={styles.gridImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={image} alt={`MEL Laundry Image ${index + 1}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
