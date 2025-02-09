/* eslint-disable react/no-unescaped-entities */

"use client";

import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaWater, FaMapMarkerAlt, FaPhone, FaGift, FaSnowflake, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from 'react-icons/fa';
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
  blurDataURL: string;
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
    img: '/images/effect.png', 
    description: 'Get your laundry done quickly with our high-speed machines.' 
  },
  { 
    title: 'Convenient Locations',  
    img: '/images/servicelogo.png', 
    description: 'Find us easily across Nairobi with locations close to you.'

  },
  { 
    title: '24/7 Availability', 
    img: '/images/247.png', 
    description: 'Do your laundry on your schedule, anytime, day or night.' 
  },
];

const steps: Step[] = [
  {
    icon: FaTshirt,
    title: 'Bring Your Laundry',
    img: '/images/Dirttowel.jpg',
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

// Update pricingCategories without the New Year offer
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
    ]
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Kyree Abraham",
    position: "Investor/Director",
    image: "/images/kyre.png",
    blurDataURL: "/images/kyree-blur.png"

  },
  {
    name: "Angel Tamara",
    position: "Executive Director",
    image: "/images/tamara.png",
    blurDataURL: "/images/tamara-blur.png"
  },

  {
    name: "George Dralagar",
    position: "Marketing Lead & Developer",
    image: "/images/george.png",
    blurDataURL: "/images/george-blur.png"
  },
  {
    name: "Sylvia Achista",
    position: "Manager",
    image: "/images/cylvia.png",
    blurDataURL: "/images/sylvia-blur.png"
  },
  {
    name: "Benard Mweke",
    position: "Supervisor",
    image: "/images/benard.png",
    blurDataURL: "/images/benard-blur.png"
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
    author: "Collins Mwenga"
  }
];

// Define animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const winners = [
  { number: "07****7314", prize: "500" },
  { number: "07****8600", prize: "500" },
  { number: "07****2615", prize: "500" },
  { number: "07****7431", prize: "500" },
  { number: "07****7097", prize: "500" },
  { number: "07****0190", prize: "1000" },
  { number: "07****3356", prize: "1000" },
  { number: "07****7781", prize: "500" },
  { number: "07****1349", prize: "500" },
  { number: "07****3899", prize: "500" }
];

const LotteryAnnouncement = () => (
  <motion.section
    className={styles.announcementSection}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    variants={cardVariants}
  >
    <div className={styles.announcementCard}>
      <h2 className={styles.announcementTitle}>MEL Laundry Lottery Winners!</h2>
      <p className={styles.announcementDate}>
        Drawing held on Friday, January 31st, 2025 at 8:00 PM
      </p>

      {/* Video Announcement */}
      <div className={styles.videoWrapper}>
        <video 
          controls 
          width="100%" 
          className={styles.announcementVideo}
          playsInline
          preload="metadata"
        >
          <source src="/images/Anounce.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Winners List */}
      <div className={styles.winnersSection}>
        <h3>Congratulations to Our Winners!</h3>
        <div className={styles.winnersList}>
          {winners.map((winner, index) => (
            <motion.div 
              key={index}
              className={styles.winnerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={styles.winnerNumber}>{winner.number}</span>
              <span className={styles.winnerPrize}>KSh {winner.prize}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

const Home: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={styles.homeContainer}>
        {/* Hero Section */}
        <motion.section
          id="hero"
          className={styles.homeHero}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/Aboutbg.jpg"
              alt="MEL Laundry Professional Services"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}

            />
          </div>
          <div className={styles.heroOverlay}></div>
          <motion.div
            className={styles.heroContent}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              SELF-CONTAINED 15 MIN QUICK WASH & DRYING
            </h1>
            <p className={`${styles.heroDescription} ${styles.highlightedText}`}>
              Experience premium hassle-free laundry solutions with MEL Laundry's state-of-the-art facilities and expert care. Serving Nairobi with excellence in self-service and affordable laundry options.
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
          className={styles.featuresSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <h2 className={styles.sectionTitle}>Our Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                variants={fadeInUp}
              >
                <div className={styles.featureImageContainer}>
                  <Image
                    src={feature.img}
                    alt={feature.title}
                    fill
                    className={styles.featureImage}
                  />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
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
                <p className={styles.itemDescription}>{step.description}</p>
                <Image
                  src={step.img}
                  alt={step.title}
                  width={64}
                  height={64}
                  objectFit="cover"
                  objectPosition="center"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          id="pricing"
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
          id="team"
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
                transition={{ duration: 0.3 }}
              >
                <div className={styles.teamImageContainer}>
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={150} 
                    height={150} 
                    className={styles.teamImage}
                    placeholder="blur"
                    blurDataURL={member.blurDataURL}
                    unoptimized
                    style={{ 
                      objectFit: 'cover', 
                      borderRadius: '50%', 
                      transition: 'transform 0.3s ease',
                      backgroundColor: '#f0f0f0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
          id="contact"
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

        <LotteryAnnouncement />

        {/* Back to Top Button */}
        <motion.button
          className={`${styles.backToTop} ${showBackToTop ? styles.visible : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      </div>
    </>
  );
};

export default Home;