"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaCheckCircle, 
  FaStar, 
  FaIndustry, 
  FaGlobeAfrica, 
  FaUsers, 
  FaHandsHelping 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styless/About.module.css";
import Head from "next/head";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Dynamic tab content
const tabContents = {
  mission: {
    title: "Our Mission",
    content:
      "At MEL Laundry, we're committed to revolutionizing the laundry experience through innovation and excellence.",
    list: [
      { text: "24/7 convenient service access", icon: <FaCheckCircle /> },
      { text: "Eco-friendly washing solutions", icon: <FaLeaf /> },
      { text: "Premium quality at affordable rates", icon: <FaStar /> },
      { text: "State-of-the-art technology", icon: <FaIndustry /> },
    ],
  },
  vision: {
    title: "Our Vision",
    content:
      "Leading the transformation of laundry services in Kenya through technology and sustainability.",
    list: [
      { text: "Setting industry standards", icon: <FaStar /> },
      { text: "Expanding across East Africa", icon: <FaGlobeAfrica /> },
      { text: "Customer satisfaction focus", icon: <FaUsers /> },
      { text: "Environmental stewardship", icon: <FaLeaf /> },
    ],
  },
  values: {
    title: "Our Values",
    content:
      "Built on a foundation of integrity, innovation, and customer-centricity.",
    list: [
      { text: "Uncompromising quality", icon: <FaCheckCircle /> },
      { text: "Environmental responsibility", icon: <FaLeaf /> },
      { text: "Innovation-driven growth", icon: <FaIndustry /> },
      { text: "Community impact", icon: <FaHandsHelping /> },
    ],
  },
};

type TabKey = keyof typeof tabContents;

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("mission");

  return (
    <div className="page-container">
      <Head>
        <title>MEL Laundry - Professional Machine Washing Services in Nairobi</title>
        <meta
          name="description"
          content="MEL Laundry offers professional machine washing services in Nairobi, including areas like Donholm. Experience top-quality laundry solutions across multiple locations."
        />
        <meta
          name="keywords"
          content="MEL Laundry, professional laundry services, machine washing, Nairobi laundry, Donholm laundry, eco-friendly laundry, premium laundry services, laundry in Nairobi, laundry in Donholm, multiple locations laundry"
        />
        <link rel="canonical" href="https://www.mellaundry.co.ke/about" />
        <meta
          property="og:title"
          content="MEL Laundry - Professional Machine Washing Services in Nairobi"
        />
        <meta
          property="og:description"
          content="MEL Laundry offers professional machine washing services in Nairobi, including areas like Donholm. Experience top-quality laundry solutions across multiple locations."
        />
        <meta
          property="og:url"
          content="https://www.mellaundry.co.ke/about"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.mellaundry.co.ke/images/Inside.jpg"
        />
      </Head>

      <motion.div
        className={styles.container}
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/Inside.jpg"
              alt="MEL Laundry Hero"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              priority
              className={styles.bgImage}
            />
            <div className={styles.overlay} />
          </div>
          <motion.h1 className={styles.title} variants={fadeInUp}>
            About MEL Laundry
          </motion.h1>
        </div>

        {/* Main Content */}
        <motion.div className={styles.mainContent} variants={fadeInUp}>
          {/* Tabs */}
          <div className={styles.tabContainer} role="tablist">
            {Object.keys(tabContents).map((key) => (
              <button
                key={key}
                className={`${styles.tabButton} ${
                  activeTab === key ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(key as TabKey)}
                aria-selected={activeTab === key}
                aria-controls={`${key}-panel`}
                role="tab"
              >
                {tabContents[key as TabKey].title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`${activeTab}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.contentSection}
            >
              <h2>{tabContents[activeTab].title}</h2>
              <p>{tabContents[activeTab].content}</p>
              <ul className={styles.featureList}>
                {tabContents[activeTab].list.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    className={styles.featureListItem}
                  >
                    <div className={styles.featureContent}>
                      <span className={styles.iconWrapper}>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Locations */}
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

          {/* Call to Action */}
          <motion.section
            className={styles.ctaSection}
            variants={fadeInUp}
          >
            <h2>Experience Premium Laundry Service</h2>
            <p>
              Join thousands of satisfied customers who trust MEL Laundry for
              their laundry needs
            </p>
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
