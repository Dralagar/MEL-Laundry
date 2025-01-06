/* eslint-disable react/no-unescaped-entities */

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
    img: '/images/wash.png',
    description: 'Use our high-efficiency washing machines to clean your clothes.'
  },
  {
    icon: MdLocalLaundryService,
    title: 'Dry',
    img: '/images/dryclothes.jpeg',
    description: 'Dry your clothes quickly with our powerful dryers.'
  }
];

// Add the New Year offer
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

// Update pricingCategories to include the new offer
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
    ]
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Kyree Abraham",
    position: "Manager",
    image: "/images/Kyree.png",
    bio: "John is the manager at MEL Laundry with over 10 years of experience in the industry.",
  
  },
  {
    name: "Angel Tamara",
    position: "Operations Manager",
    image: "/images/Tamara.png",
    bio: "Jane has been with MEL Laundry for 5 years, ensuring smooth operations and customer satisfaction.",
  
  },
  {
    name: "George Dralagar",
    position: "Marketing Lead & Developer",
    image: "/images/George.png",
    bio: "George is the marketing lead and developer at MEL Laundry, ensuring smooth operations and customer satisfaction.",
  },
  {
    name: "Betty Likavo",
    position: "Customer Service Lead",
    image: "/images/",
    bio: "Betty leads our customer service team, dedicated to providing the best experience for our clients.",
    
  }
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    content: "MEL Laundry provides excellent service and my clothes are always perfectly clean.",
    author: "Ivy Mwende"
  },
  {
    id: "2",
    content: "The staff at MEL Laundry are friendly and professional. Highly recommend!",
    author: "Kelvin Abwenje"
  },
  {
    id: "3",
    content: "Great service and affordable prices. I always use MEL Laundry for my laundry needs.",
    author: "Cleopas Malala"
  }
];

// Update the announcement section for the New Year offer
const NewYearAnnouncement = () => (
  <motion.section
    className={styles.announcementSection}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
  >
    <div className={styles.announcementContent}>
      <p>Dear esteemed customer of MEL</p>
      <p>
        MEL has a New Year offer for a load of mixed clothes of 18 kg washed &amp; dried for KSh 1990/= from 31/12/2024 - 10/01/2025 (Exclusive ironing and folding).
      </p>
      <p>
        During this period, MEL will also have a drawing of 5 lucky winners of VOUCHER cash cards worth KSh 500/= up to KSh 1000/=, which will be drawn and announced on Friday 10/01/2025 at 8PM.
      </p>
      <p>
        The lottery tickets are for customers of MEL using MEL&apos;s services in this period, and the receipt is the ticket, so keep your receipt well.
      </p>
      <p>
        Feel free to visit one of MEL&apos;s new branches at Embakasi Constituency, Donholm Phase 8 from Friday 31/01/2025.
      </p>
      <p>MEL wishes you a happy &amp; prosperous new year.</p>
      <p>Sincerely,</p>
      <p>MEL Team</p>
    </div>
  </motion.section>
);

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Mellaundry - Premier Laundry Services in Nairobi, Kenya</title>
        <meta name="description" content="Discover Mellaundry, your go-to solution for fast, efficient, and affordable laundry services in Nairobi and across Kenya. Experience convenience and quality with us." />
        <meta name="keywords" content="laundry Nairobi, laundry Kenya, Mellaundry, laundry services, Nairobi laundry, Kenya laundry" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags for better social media integration */}
        <meta property="og:title" content="Mellaundry - Premier Laundry Services in Nairobi, Kenya" />
        <meta property="og:description" content="Discover Mellaundry, your go-to solution for fast, efficient, and affordable laundry services in Nairobi and across Kenya." />
        <meta property="og:url" content="https://www.mellaundry.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.mellaundry.com/images/og-image.jpg" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mellaundry - Premier Laundry Services in Nairobi, Kenya" />
        <meta name="twitter:description" content="Discover Mellaundry, your go-to solution for fast, efficient, and affordable laundry services in Nairobi and across Kenya." />
        <meta name="twitter:image" content="https://www.mellaundry.com/images/twitter-image.jpg" />
      </Head>
      <div className={styles.homeContainer}>
        {/* Hero Section */}
        <motion.section
          className={styles.homeHero}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/aboutbg.jpg"
              alt="MEL Laundry Professional Services"
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
            <h1 className={styles.heroTitle}>
              SELF CONTAINED 15 MIN QUICK WASH & DRYING PROFESSIONAL LAUNDRY SERVICES IN NAIROBI
            </h1>
            <p className={styles.heroDescription}>
              Experience Premium Hassle-Free Laundry Solutions with MEL Laundry&apos;s state-of-the-art facilities and expert care. Serving Nairobi with excellence.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/locations" className={styles.ctaButton}>
                Find Nearest Location
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
            <button 
              className={styles.paymentButton}
              onClick={() => window.open('https://buygoods.co.ke/buy/4572688', '_blank')}
            >
              Buy Goods Till: 4572688
            </button>
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
          <motion.div className={styles.teamHeader} variants={fadeInUp}>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.teamSubtitle}>The passionate professionals behind MEL Laundry's success</p>
          </motion.div>
          
          <div className={styles.teamRow}>
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className={styles.teamMember}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.teamImageContainer}>
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={150} 
                    height={150} 
                    className={styles.teamImage}
                    priority={index < 2}
                  />
                </div>
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <h4>{member.position}</h4>
                  {member.bio && <p>{member.bio}</p>}
                  <div className={styles.socialLinks}>
                    {member.socialLinks?.linkedin && <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                    {member.socialLinks?.twitter && <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
                    {member.socialLinks?.email && <a href={`mailto:${member.socialLinks.email}`}><FaEnvelope /></a>}
                  </div>
                </div>
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
            <motion.div className={styles.contactItem} variants={fadeInUp}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <p>New Branch: Embakasi Constituency, Donholm Phase 8, opening from January 31st, 2025</p>
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

        <NewYearAnnouncement />

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>&copy; {new Date().getFullYear()} MEL Laundry. All rights reserved.</p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/mellaundry" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/mellaundry" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="mailto:info@mellaundry.com">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;