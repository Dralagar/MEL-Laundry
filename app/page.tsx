"use client";

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaWater, FaMapMarkerAlt, FaPhone, FaGift, FaSnowflake, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { MdLocalLaundryService, MdOutlineDryCleaning } from 'react-icons/md';
import { IoShirt } from "react-icons/io5";
import { GiWashingMachine, GiIronCross } from "react-icons/gi";
import { motion, Variants } from 'framer-motion';
import styles from './styless/Home.module.css';

// Motion variants
const fadeInUp: Variants = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Interfaces
interface Feature {
  title: string;
  description: string;
  img: string;
}

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  img: string;
}

interface PriceCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: PriceItem[];
}

interface PriceItem {
  name: string;
  price: string | { from: string; to: string };
  description?: string;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
}

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// Data arrays
const features: Feature[] = [
  { 
    title: 'Fast & Efficient',  
    img: '/images/first.png', 
    description: 'Get your laundry done quickly with our high-speed machines.' 
  },
  { 
    title: 'Convenient Locations',  
    img: '/images/servicelogo.png', 
    description: 'Find us easily across Nairobi with locations close to you.'
  },
  { 
    title: '24/7 Availability', 
    img: '/images/24hour.png', 
    description: 'Do your laundry on your schedule, anytime, day or night.' 
  },
];

const steps: Step[] = [
  {
    icon: FaTshirt,
    title: 'Bring Your Laundry',
    img: '/images/dirttowel.jpg',
    description: 'Bring your dirty clothes to any MEL Laundry location.'
  },
  {
    icon: FaWater,
    title: 'Wash',
    img: '/images/24hour.png',
    description: 'Use our high-efficiency washing machines to clean your clothes.'
  },
  {
    icon: MdLocalLaundryService,
    title: 'Dry',
    img: '/images/dryclothes.jpeg',
    description: 'Dry your clothes quickly with our powerful dryers.'
  }
];

const newYearOffers: PriceCategory = {
  title: "New Year Specials 🎉",
  icon: FaGift,
  items: [
    {
      name: "New Year Mixed Load",
      price: "1990",
      description: "18kg washed & dried (Exclusive ironing and folding)"
    }
  ]
};

const pricingCategories: PriceCategory[] = [
  newYearOffers,
  {
    title: "Special Offers",
    icon: GiWashingMachine,
    items: [
      {
        name: "Mixed Clothes Special",
        price: "500",
        description: "Up to 8kg of mixed clothes"
      },
      {
        name: "Regular Mixed (Per kg)",
        price: "99",
        description: "Price per kilogram of mixed clothes"
      }
    ]
  },
  {
    title: "Wash & Dry Services",
    icon: MdOutlineDryCleaning,
    items: [
      {
        name: "Full Load (8kg)",
        price: "1000",
        description: "Assorted clothes - complete service"
      },
      {
        name: "Washing Only (8kg)",
        price: "500",
        description: "Washing service only"
      },
      {
        name: "Duvets & Blankets",
        price: { from: "500", to: "700" },
        description: "Complete wash and dry service"
      },
      {
        name: "Duvet Cover",
        price: { from: "300", to: "400" }
      },
      {
        name: "Underwear Load",
        price: "400",
        description: "Up to 2kg"
      }
    ]
  },
  {
    title: "Individual Items",
    icon: IoShirt,
    items: [
      { name: "Sheer", price: "150" },
      { name: "Bedsheet", price: { from: "150", to: "300" } },
      { name: "Suit", price: { from: "500", to: "700" } },
      { name: "Women's Suit/Dress", price: "250" },
      { name: "Kanzu", price: "150" },
      { name: "Sweater/Jacket", price: { from: "100", to: "200" } },
      { name: "Trench Coat", price: "200" },
      { name: "Trouser", price: "100" },
      { name: "Shirt", price: "100" }
    ]
  },
  {
    title: "Ironing Services",
    icon: GiIronCross,
    items: [
      { name: "Shirt", price: "30" },
      { name: "Suit (Trouser & Coat)", price: "100" },
      { name: "Kazu", price: "50" },
      { name: "Dress", price: "100" }
    ]
  }
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    content: "MEL Laundry has made my life so much easier. Their machines are always clean and well-maintained!",
    author: "David Tito."
  },
  {
    id: "2",
    content: "The best laundry service in Nairobi. Fast, efficient, and very affordable!",
    author: "Collins Bokelo."
  },
  {
    id: "3",
    content: "I love how convenient their locations are. 24/7 service is a game-changer!",
    author: "Ouma Geofrey."
  }
];

const PromotionalBanner = () => (
  <motion.div 
    className={styles.festivePromo}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
  >
    <FaSnowflake className={styles.snowflake} />
    <h3>🎉 New Year Special: 18kg mixed load washed & dried for KSh 1990 until January 10th! 🎊</h3>
    <p>Participate in our draw for a chance to win a VOUCHER cash card worth KSh 500 - KSh 1000. Keep your receipt as your ticket!</p>
  </motion.div>
);

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Mellaundry - Premier Laundry Services in Nairobi, Kenya</title>
        <meta name="description" content="Discover Mellaundry, a modern laundry service offering fast, efficient, and affordable solutions in Nairobi, Kenya." />
      </Head>
      <main className={styles.mainContainer}>
        <PromotionalBanner />
        <motion.section 
          className={styles.featuresSection} 
          variants={staggerChildren} 
          initial="initial" 
          animate="animate"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureItem}
              variants={fadeInUp}
            >
              <Image 
                src={feature.img} 
                alt={feature.title} 
                width={64} 
                height={64} 
                className={styles.featureImage} 
              />
              <h3 className={styles.itemTitle}>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          className={styles.stepsSection} 
          variants={staggerChildren} 
          initial="initial" 
          animate="animate"
        >
          <h2>How It Works</h2>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.stepItem}
              variants={fadeInUp}
            >
              {React.createElement(step.icon, { className: styles.icon })}
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <Image src={step.img} alt={step.title} width={64} height={64} />
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          className={styles.pricingSection} 
          variants={staggerChildren} 
          initial="initial" 
          animate="animate"
        >
          <h2>Our Services & Pricing</h2>
          {pricingCategories.map((category, index) => (
            <motion.div
              key={index}
              className={styles.categoryCard}
              variants={fadeInUp}
            >
              <div className={styles.categoryHeader}>
                {React.createElement(category.icon, { className: styles.categoryIcon })}
                <h3>{category.title}</h3>
              </div>
              <div className={styles.priceList}>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={styles.priceItem}>
                    <div className={styles.priceItemInfo}>
                      <span className={styles.itemName}>{item.name}</span>
                      {item.description && (
                        <span className={styles.itemDescription}>{item.description}</span>
                      )}
                    </div>
                    <span className={styles.itemPrice}>
                      {typeof item.price === 'string' 
                        ? `KSh ${item.price}`
                        : `KSh ${item.price.from} - ${item.price.to}`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          className={styles.testimonialsSection} 
          variants={staggerChildren} 
          initial="initial" 
          animate="animate"
        >
          <h2>What Our Customers Say</h2>
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} className={styles.testimonialItem} variants={fadeInUp}>
              <p>{testimonial.content}</p>
              <h4>- {testimonial.author}</h4>
            </motion.div>
          ))}
        </motion.section>

        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Mellaundry. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};

export default Home;


