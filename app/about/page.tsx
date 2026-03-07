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
  FaHandsHelping,
} from "react-icons/fa";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import styles from "../styless/About.module.css";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const tabTransition = { duration: 0.3 };

interface TabItem {
  text: string;
  icon: React.ReactNode;
}

interface TabContent {
  title: string;
  content: string;
  list: TabItem[];
}

const TAB_CONTENTS: Record<string, TabContent> = {
  mission: {
    title: "Our Mission",
    content:
      "At MEL Laundry we are committed to revolutionising the laundry experience through innovation, reliability, and excellence. We combine modern equipment with eco-conscious practices to deliver consistent results you can trust.",
    list: [
      { text: "24/7 convenient service access", icon: <FaCheckCircle aria-hidden /> },
      { text: "Eco-friendly washing solutions", icon: <FaLeaf aria-hidden /> },
      { text: "Premium quality at affordable rates", icon: <FaStar aria-hidden /> },
      { text: "State-of-the-art technology", icon: <FaIndustry aria-hidden /> },
    ],
  },
  vision: {
    title: "Our Vision",
    content:
      "To lead the transformation of laundry services in Kenya and beyond through technology, sustainability, and outstanding customer care. We aim to set the standard for convenience and quality in the industry.",
    list: [
      { text: "Setting industry standards", icon: <FaStar aria-hidden /> },
      { text: "Expanding across East Africa", icon: <FaGlobeAfrica aria-hidden /> },
      { text: "Customer satisfaction at the core", icon: <FaUsers aria-hidden /> },
      { text: "Environmental stewardship", icon: <FaLeaf aria-hidden /> },
    ],
  },
  values: {
    title: "Our Values",
    content:
      "Our work is built on integrity, innovation, and putting customers first. We hold ourselves to high standards in every location and every wash.",
    list: [
      { text: "Uncompromising quality", icon: <FaCheckCircle aria-hidden /> },
      { text: "Environmental responsibility", icon: <FaLeaf aria-hidden /> },
      { text: "Innovation-driven growth", icon: <FaIndustry aria-hidden /> },
      { text: "Community impact", icon: <FaHandsHelping aria-hidden /> },
    ],
  },
};

type TabKey = keyof typeof TAB_CONTENTS;

const TAB_KEYS: TabKey[] = ["mission", "vision", "values"];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("mission");
  const content = TAB_CONTENTS[activeTab];

  return (
    <div className="page-container">
      <motion.article
        className={styles.container}
        initial="initial"
        animate="animate"
        variants={fadeIn}
        aria-label="About MEL Laundry"
      >
        {/* Hero */}
        <header className={styles.heroSection} aria-label="Page header">
          <div className={styles.imageWrapper}>
            <Image
              src="/images/Inside.jpg"
              alt="Inside view of MEL Laundry facilities: washing machines and clean, modern space"
              fill
              style={{ objectFit: "cover" }}
              quality={90}
              priority
              sizes="100vw"
              className={styles.bgImage}
            />
            <div className={styles.overlay} aria-hidden />
          </div>
          <motion.h1 className={styles.title} variants={fadeInUp}>
            About MEL Laundry
          </motion.h1>
        </header>

        {/* Main content */}
        <div className={styles.mainContent}>
          <p className={styles.intro}>
            We are a professional laundry service in Nairobi offering self-service and drop-off options. Learn more about what drives us and where to find us.
          </p>

          <div
            className={styles.tabContainer}
            role="tablist"
            aria-label="Mission, vision and values"
          >
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                id={`${key}-tab`}
                className={`${styles.tabButton} ${activeTab === key ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(key)}
                aria-selected={activeTab === key}
                aria-controls={`${key}-panel`}
                role="tab"
              >
                {TAB_CONTENTS[key]?.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={activeTab}
              id={`${activeTab}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={tabTransition}
              className={styles.contentSection}
            >
              <h2>{content?.title}</h2>
              <p>{content?.content}</p>
              <ul className={styles.featureList} aria-label={`${content?.title} highlights`}>
                {content?.list?.map((item, index) => (
                  <motion.li
                    key={`${activeTab}-${index}`}
                    variants={fadeInUp}
                    className={styles.featureListItem}
                  >
                    <div className={styles.featureContent}>
                      <span className={styles.iconWrapper}>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </AnimatePresence>

          {/* Locations */}
          <motion.section
            className={styles.locationSection}
            variants={fadeInUp}
            aria-labelledby="locations-heading"
          >
            <h2 id="locations-heading">Our Locations</h2>
            <div className={styles.locationCard}>
              <FaMapMarkerAlt className={styles.mapIcon} aria-hidden />
              <div>
                <h3>Multiple locations in Nairobi</h3>
                <p>Find your nearest MEL Laundry outlet, including Donholm and more.</p>
                <Link href="/locations" className={styles.locationLink}>
                  View all locations
                </Link>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            className={styles.ctaSection}
            variants={fadeInUp}
            aria-labelledby="cta-heading"
          >
            <h2 id="cta-heading">Experience premium laundry service</h2>
            <p>
              Join thousands of satisfied customers who trust MEL Laundry for their laundry needs.
            </p>
            <Link href="/locations" className={styles.ctaButton}>
              Get started today
            </Link>
          </motion.section>
        </div>
      </motion.article>
    </div>
  );
}
