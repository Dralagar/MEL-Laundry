"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from '../styless/About.module.css';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const tabContents = {
  mission: {
    title: "Our Mission",
    content: "At MEL Laundry, we're committed to revolutionizing the laundry experience through innovation and excellence.",
    list: [
      "24/7 convenient service access",
      "Eco-friendly washing solutions",
      "Premium quality at affordable rates",
      "State-of-the-art technology"
    ]
  },
  vision: {
    title: "Our Vision",
    content: "Leading the transformation of laundry services in Kenya through technology and sustainability.",
    list: [
      "Setting industry standards",
      "Expanding across East Africa",
      "Customer satisfaction focus",
      "Environmental stewardship"
    ]
  },
  values: {
    title: "Our Values",
    content: "Built on a foundation of integrity, innovation, and customer-centricity.",
    list: [
      "Uncompromising quality",
      "Environmental responsibility",
      "Innovation-driven growth",
      "Community impact"
    ]
  }
};

type TabKey = keyof typeof tabContents;

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mission');

  return (
    <motion.div 
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className={styles.heroSection}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/laundrybg.jpg" 
            alt="MEL Laundry Hero"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
            className={styles.bgImage}
          />
          <div className={styles.overlay} />
        </div>
        <motion.h1
          className={styles.title}
          variants={fadeInUp}
        >
          About MEL Laundry
        </motion.h1>
      </div>

      <motion.div 
        className={styles.mainContent}
        variants={fadeInUp}
      >
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
          className={styles.contentSection}
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{tabContents[activeTab].title}</h2>
          <p>{tabContents[activeTab].content}</p>
          <ul className={styles.featureList}>
            {tabContents[activeTab].list.map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                custom={index}
              >
                <FaTshirt className={styles.icon} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.section
          className={styles.locationSection}
          variants={fadeInUp}
        >
          <h2>Our Locations</h2>
          <div className={styles.locationCard}>
            <FaMapMarkerAlt className={styles.mapIcon} />
            <div
              style={{
                backgroundImage: 'url("/images/location-bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '2rem',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              <div className={styles.textOverlay}></div>
              <h3>Multiple Locations in Nairobi</h3>
              <p>Find your nearest MEL Laundry outlet</p>
              <Link href="/contact" className={styles.locationLink}>
                View All Locations
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          className={styles.ctaSection}
          variants={fadeInUp}
        >
          <h2>Experience Premium Laundry Service</h2>
          <p>Join thousands of satisfied customers who trust MEL Laundry</p>
          <Link href="/contact" className={styles.ctaButton}>
            Get Started Today
          </Link>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
