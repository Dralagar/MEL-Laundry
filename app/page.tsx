/* eslint-disable react/no-unescaped-entities */

"use client";

import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaWater, FaMapMarkerAlt, FaPhone, FaGift, FaSnowflake, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp, FaCrown, FaStar, FaPlay } from 'react-icons/fa';
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
  id: string;
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

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  visits: number;
  totalSpent: number;
  lastVisit: Date;
  isSubscribed: boolean;
}

// Data arrays
const features: Feature[] = [
  { 
    title: 'Fast & Efficient',  
    img: '/images/Effect.png', 
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
    img: '/images/Dirttowel.png',
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
    img: '/images/Dryclothe.jpeg',
    description: 'Dry your clothes quickly with our powerful dryers.'
  }
];

// Update pricingCategories without the New Year offer
const pricingCategories: PriceCategory[] = [
  {
    id: "special-offers",
    title: "Special Offers",
    icon: GiWashingMachine,
    items: [
      {
        name: "Mixed Clothes Special",
        price: "500",
        description: "Up to 6kg of mixed clothes"
      },
      {
        name: "Regular Mixed (Per kg)",
        price: "125",
        description: "Price per kilogram of mixed clothes"
      }
    ]
  },
  {
    id: "wash-dry-services",
    title: "Wash & Dry Services",
    icon: MdOutlineDryCleaning,
    items: [
      {
        name: "Full Load (6kg)",
        price: "500",
        description: "Assorted clothes - complete service"
      },
      {
        name: "Full Load Machine wash and Quick Drying (6kg)",
        price: "1000",
        description: "Assorted clothes - complete service"
      },
      {
        name: "Washing Only (6kg)",
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
        name: "Shoes (Per Pair)",
        price: "150",
        description: "Washing service only"
      },
    ]
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Kyree Abraham",
    position: "Investor/Director",
    image: "/images/kyre.png",
    blurDataURL: "/images/kyre-blur.png"
  },
  {
    name: "Angel Tamara",
    position: "Executive Director",
    image: "/images/Tamara.png",
    blurDataURL: "/images/tamara-blur.png"
  },
  {
    name: "George Dralagar",
    position: "Marketing Lead & Developer",
    image: "/images/George.png",
    blurDataURL: "/images/george-blur.png"
  },
  {
    name: "Benard Mweke",
    position: "Senior Manager",
    image: "/images/Benard.jpg",
    blurDataURL: "/images/Benard.jpg"
  },
  {
    name: " Priscar",
    position: "Supervisor",
    image: "/images/priscar.png",  
    blurDataURL: "/images/Ikapel.jpg"
  },
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

// Customer registration component
const CustomerRegistration: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would save this to a database
    const customerData = {
      name,
      phone,
      email,
      isSubscribed,
      visits: 1,
      totalSpent: 0,
      lastVisit: new Date()
    };
    
    // Save to localStorage for demo purposes
    const existingCustomers = JSON.parse(localStorage.getItem('melCustomers') || '[]');
    existingCustomers.push({...customerData, id: Date.now().toString()});
    localStorage.setItem('melCustomers', JSON.stringify(existingCustomers));
    
    setIsRegistered(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setIsRegistered(false);
    }, 3000);
  };

  return (
    <div className={styles.registrationForm}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={styles.registrationInput}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className={styles.registrationInput}
      />
      <input
        type="email"
        placeholder="Email (Optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.registrationInput}
      />
      <label className={styles.subscriptionLabel}>
        <input
          type="checkbox"
          checked={isSubscribed}
          onChange={(e) => setIsSubscribed(e.target.checked)}
        />
        Send me special deals
      </label>
      <button type="submit" onClick={handleSubmit} className={styles.registrationButton}>
        Join Now
      </button>
      
      {isRegistered && (
        <div className={styles.registrationSuccess}>
          <p>Welcome! You're entered to win.</p>
        </div>
      )}
    </div>
  );
};

// Promotional container component with 8fr/4fr flexbox (form left, video right)
const PromotionalContainer: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  
  const videoContent = [
    {
      title: "Win Big This Week",
      description: "Check our lottery winners and join the excitement!",
      image: "/images/About.jpg"
    },
    {
      title: "Exclusive Member Deals",
      description: "Special offers available only for our loyal members.",
      image: "/images/About.jpg"
    },
    {
      title: "Success Stories",
      description: "See what our customers love about MEL Laundry.",
      image: "/images/About.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videoContent.length]);

  return (
    <div className={styles.promotionalContainer}>
      {/* Left Side - Registration Form (8fr) */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h3>Join & Win</h3>
          <p>Register for exclusive deals and weekly lottery!</p>
          
          <CustomerRegistration />
        </div>
      </div>

      {/* Right Side - Dynamic Video Frame (4fr) */}
      <div className={styles.videoSection}>
        <div className={styles.videoHeader}>
          <h3>Winners Hub</h3>
          <p>Lottery results & special offers</p>
        </div>
        
        {/* Dynamic Video Frame */}
        <div className={styles.singleVideoFrame}>
          <div className={styles.videoThumbnail}>
            <Image
              src={videoContent[currentVideo].image}
              alt={videoContent[currentVideo].title}
              fill
              style={{ objectFit: 'cover' }}
              className={styles.thumbnailImage}
            />
            <div className={styles.playButton}>
              <FaPlay />
            </div>
            <div className={styles.videoIndicator}>
              <span className={styles.indicatorDot}></span>
              <span className={styles.indicatorDot}></span>
              <span className={styles.indicatorDot}></span>
            </div>
          </div>
          <div className={styles.videoInfo}>
            <h4>{videoContent[currentVideo].title}</h4>
            <p>{videoContent[currentVideo].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              src="/images/About.jpg"
              alt="MEL Laundry Professional Services"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={85}
              priority
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
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Our Features
          </motion.h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureCard}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
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

        {/* How It Works Section - Icons Centrally Aligned */}
        <motion.section
          className={styles.howItWorksSection}
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
              <motion.div
                key={index}
                className={styles.stepCard}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                {/* Icon Centered at Top */}
                <div className={styles.stepIconWrapper}>
                  <step.icon className={styles.stepIcon} />
                </div>
                
                {/* Title */}
                <h3 className={styles.stepTitle}>{step.title}</h3>
                
                {/* Image Container */}
                <div className={styles.stepImageContainer}>
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className={styles.stepImage}
                  />
                </div>
                
                {/* Description */}
                <p className={styles.stepDescription}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          className={styles.pricingSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Our Services & Pricing
          </motion.h2>
          <p className={styles.pricingSubtitle}>
            Professional laundry services at competitive prices
          </p>
          <div className={styles.pricingGrid}>
            {pricingCategories.map((category, index) => (
              <motion.div
                key={index}
                className={styles.pricingCategory}
                variants={fadeInUp}
              >
                <div className={styles.pricingHeader}>
                  <category.icon className={styles.pricingIcon} />
                  <h3 className={styles.pricingTitle}>{category.title}</h3>
                </div>
                <div className={styles.pricingItems}>
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={styles.pricingItem}>
                      <h4 className={styles.pricingItemName}>{item.name}</h4>
                      {item.description && (
                        <p className={styles.pricingItemDescription}>{item.description}</p>
                      )}
                      <p className={styles.pricingItemPrice}>
                        {typeof item.price === 'string' 
                          ? `KSh ${item.price}`
                          : `KSh ${item.price.from} - ${item.price.to}`
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Promotional Container Section - 9fr/3fr Grid */}
        <motion.section
          className={styles.customerSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Join Our Loyalty Program
          </motion.h2>
          <PromotionalContainer />
        </motion.section>

        {/* Team Section */}
        <motion.section
          className={styles.teamSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            Meet Our Team
          </motion.h2>
          <p className={styles.teamSubtitle}>
            The passionate professionals behind MEL Laundry's success
          </p>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={styles.teamMember}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.memberImageContainer}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.memberImage}
                    placeholder="blur"
                    blurDataURL={member.blurDataURL}
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberPosition}>{member.position}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className={styles.testimonialsSection}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
            What Our Customers Say
          </motion.h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={styles.testimonialCard}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                <p className={styles.testimonialAuthor}>- {testimonial.author}</p>
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
              <p>Shiloh Towers, Opposite CFF Donholm, Savannah Road, Nairobi, Kenya</p>
            </motion.div>
            <motion.div className={styles.contactItem} variants={fadeInUp}>
              <FaPhone className={styles.contactIcon} />
              <p>+254769003443</p>
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