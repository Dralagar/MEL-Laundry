"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaWater, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
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

const pricingCategories: PriceCategory[] = [
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
      { name: "Kazu", price: "150" },
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
    author: "Sarah K."
  },
  {
    id: "2",
    content: "The best laundry service in Nairobi. Fast, efficient, and very affordable!",
    author: "John M."
  },
  {
    id: "3",
    content: "I love how convenient their locations are. 24/7 service is a game-changer!",
    author: "David O."
  }
];

const teamMembers: TeamMember[] = [
  {
    name: 'Kyrre Abraham',
    position: 'Founder & CEO',
    image: '/images/Kyree.png'
  },
  {
    name: 'Angel Tamara',
    position: 'Operations Manager',
    image: '/images/Tamara.png'
  },
  {
    name: 'Dralagar George',
    position: 'Marketing Lead & Developer',
    image: '/images/George.png'
  },
  {
    name: 'Betty Likavo',
    position: 'Customer Relations Manager',
    image: '/images/Bettymel.png'
  }
];

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <motion.section
        className={styles.homeHero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/washer.png"
            alt="MEL Laundry Hero"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <motion.div
          className={styles.heroContent}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>Experience Hassle-Free Laundry with MEL</h1>
          <p className={styles.heroDescription}>
            Enjoy fast, efficient, and affordable self-service laundry at our convenient locations across Nairobi.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/locations" className={styles.ctaButton}>
              Find a Location
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className={styles.homeFeatures}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
          Why Choose MEL Laundry?
        </motion.h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div key={index} className={styles.featureItem} variants={fadeInUp}>
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
        </div>
      </motion.section>

      {/* Steps Section */}
      <motion.section
        className={styles.howItWorks}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
          How It Works
        </motion.h2>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <motion.div key={index} className={styles.stepItem} variants={fadeInUp}>
              {React.createElement(step.icon, { className: styles.icon })}
              <h3 className={styles.itemTitle}>{step.title}</h3>
              <p>{step.description}</p>
              <Image src={step.img} alt={step.title} width={64} height={64} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        className={styles.pricing}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
          Our Services & Pricing
        </motion.h2>
        <motion.p className={styles.pricingSubtitle} variants={fadeInUp}>
          Professional laundry services at competitive prices
        </motion.p>
        
        <motion.div className={styles.pricingCategories} variants={staggerChildren}>
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
        </motion.div>
        
        <motion.div className={styles.paymentInfo} variants={fadeInUp}>
          <p>Buy Goods Till: 4572688</p>
        </motion.div>
      </motion.section>

      {/* Meet the Team Section */}
      <motion.section
        className={styles.meetTheTeam}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
          Meet the Team behind your hustlefree laundry!
        </motion.h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              className={styles.teamMember} 
              variants={fadeInUp}
            >
              <Image 
                src={member.image} 
                alt={member.name} 
                width={200} 
                height={200} 
                className={styles.teamImage}
                priority={index < 2} // Prioritize loading first two images
              />
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamPosition}>{member.position}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className={styles.homeTestimonials}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
          What Our Customers Say
        </motion.h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} className={styles.testimonialItem} variants={fadeInUp}>
              <p>{testimonial.content}</p>
              <h4>- {testimonial.author}</h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className={styles.contactSection}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>Visit Us</motion.h2>
        <div className={styles.contactInfo}>
          <motion.div className={styles.contactItem} variants={fadeInUp}>
            <FaMapMarkerAlt className={styles.contactIcon} />
            <p>Shiloh Towers, Opposite CFF Donholm, Off Manyanja Rd, Nairobi, Kenya</p>
          </motion.div>
          <motion.div className={styles.contactItem} variants={fadeInUp}>
            <FaPhone className={styles.contactIcon} />
            <p>+254740630890</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>Get Started with MEL Laundry Today!</h2>
        <p className={styles.ctaText}>
          Convenient, fast, and affordable self-service laundry in Nairobi.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/locations" className={styles.ctaButton}>
            Find a Location
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;

