"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaWater, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from '../styless/About.module.css';

// Motion variants
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Define the types for sections and features
interface TabContent {
  title: string;
  content: string;
  list: string[];
}

// Data for the About page
const tabContents: Record<string, TabContent> = {
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

interface AboutPageProps {
  tab?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ tab = 'mission' }) => {
  const [activeTab, setActiveTab] = useState<string>(tab);

  useEffect(() => {
    if (tabContents[tab]) {
      setActiveTab(tab);
    } else {
      setActiveTab('mission'); // Default to mission if invalid
    }
  }, [tab]);

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
        {Object.keys(tabContents).map((key) => (
          <button
            key={key}
            className={`${styles.tabButton} ${activeTab === key ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(key)}
            aria-selected={activeTab === key}
            role="tab"
          >
            {tabContents[key].title}
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
        <h2>{tabContents[activeTab].title}</h2>
        <p>{tabContents[activeTab].content}</p>
        <ul className={styles.checkList}>
          {tabContents[activeTab].list.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FaTshirt className={styles.checkIcon} /> {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.section
        className={styles.mapSection}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>Find Us Near You</motion.h2>
        <motion.div className={styles.mapPlaceholder} variants={fadeInUp}>
          <FaMapMarkerAlt className={styles.icon} />
          <p>We have multiple convenient locations across Nairobi</p>
        </motion.div>
      </motion.section>

      <motion.section
        className={styles.footerCta}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>Ready to Experience the Convenience?</motion.h2>
        <motion.p variants={fadeInUp}>Visit MEL Laundry today for fast and efficient self-service washing.</motion.p>
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/contact" className={styles.ctaButton}>
            Contact Us
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
