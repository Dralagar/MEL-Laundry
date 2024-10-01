"use client"; // Mark this as a client component

import React, { useState } from 'react';
import Link from 'next/link';
import { FaTshirt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from '../styless/About.module.css';

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const tabContents = {
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

type TabKey = keyof typeof tabContents;

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mission');

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
            onClick={() => setActiveTab(key as TabKey)}
            aria-selected={activeTab === key}
            role="tab"
          >
            {tabContents[key as TabKey].title}
          </button>
        ))}
      </div>

      <motion.div
        className={styles.gridContainer}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className={styles.content} key={activeTab}>
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
          variants={{
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2 
            className={styles.sectionTitle}
            variants={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Find Us Near You
          </motion.h2>
          <motion.div 
            className={styles.mapPlaceholder} 
            variants={{
              initial: { y: 20, opacity: 0 },
              animate: { y: 0, opacity: 1 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FaMapMarkerAlt className={styles.icon} />
            <p>We have multiple convenient locations across Nairobi</p>
          </motion.div>
        </motion.section>
      </motion.div>

      <motion.section
        className={styles.footerCta}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2 
          className={styles.sectionTitle} 
          variants={{
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Join us today!
        </motion.h2>
        <motion.p 
          variants={{
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Visit MEL Laundry today for fast and efficient self-service washing.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
