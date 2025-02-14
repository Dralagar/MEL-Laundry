"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styless/About.module.css';
import Head from 'next/head';

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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mission');

  return (
    <div className="page-container">
      <Head>
        <title>MEL Laundry - Professional Machine Washing Services in Nairobi</title>
        <meta name="description" content="MEL Laundry offers professional machine washing services in Nairobi, including areas like Donholm. Experience top-quality laundry solutions across multiple locations." />
        <meta name="keywords" content="MEL Laundry, professional laundry services, machine washing, Nairobi laundry, Donholm laundry, eco-friendly laundry, premium laundry services, laundry in Nairobi, laundry in Donholm, multiple locations laundry" />
        <link rel="canonical" href="https://www.mellaundry.co.ke/about" />
        <meta property="og:title" content="MEL Laundry - Professional Machine Washing Services in Nairobi" />
        <meta property="og:description" content="MEL Laundry offers professional machine washing services in Nairobi, including areas like Donholm. Experience top-quality laundry solutions across multiple locations." />
        <meta property="og:url" content="https://www.mellaundry.co.ke/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.mellaundry.co.ke/images/Aboutbg.jpg" />
      </Head>
      <motion.div 
        className={styles.container}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className={styles.heroSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/Aboutbg.jpg" 
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.contentSection}
            >
              <h2>{tabContents[activeTab].title}</h2>
              <p>{tabContents[activeTab].content}</p>
              <ul className={styles.featureList}>
                {tabContents[activeTab as TabKey].list.map((item: string | React.ReactElement, index: number) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    className={styles.featureListItem}
                  >
                    {typeof item === 'string' ? (
                      <div className={styles.featureContent}>
                        <Image
                          src="/images/247.png"
                          alt="Feature Icon"
                          width={48}
                          height={48}
                          className={styles.iconImage}
                        />
                        <span>{item}</span>
                      </div>
                    ) : (
                      item
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <motion.section
            className={styles.locationSection}
            variants={fadeInUp}
          >
            <h2>Our Locations</h2>
            <div className={styles.locationCard}>
              <FaMapMarkerAlt className={styles.mapIcon} />
              <div>
                <h3>Multiple Locations in Nairobi</h3>
                <p>Find your nearest MEL Laundry outlet</p>
                <Link href="/locations" className={styles.locationLink}>
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
                <Link href="/locations" className={styles.ctaButton}>
              Get Started Today
            </Link>
          </motion.section>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
