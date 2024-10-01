"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTshirt, FaWater, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLocalLaundryService } from 'react-icons/md';
import { motion } from 'framer-motion';
import styles from './styless/Home.module.css';

// Motion variants
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Define the types for sections and features
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

interface PricingPlan {
  title: string;
  price: string;
  capacity: string;
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
  { title: 'Affordable Rates', description: 'Enjoy self-service laundry at rates that fit your budget.', img: '/images/Affordable.png' },
  { title: 'Fast & Efficient', description: 'Get your laundry done quickly with our high-speed machines.', img: '/images/first.png' },
  { title: 'Convenient Locations', description: 'Find us easily across Nairobi with locations close to you.', img: '/images/servicelogo.png' },
  { title: '24/7 Availability', description: 'Do your laundry on your schedule, anytime, day or night.', img: '/images/24hour.png' },
];

const steps: Step[] = [
  { icon: FaTshirt, title: 'Bring Your Laundry', description: 'Bring your dirty clothes to any MEL Laundry location.', img: '/images/stophanging.png' },
  { icon: FaWater, title: 'Wash', description: 'Use our high-efficiency washing machines to clean your clothes.', img: '/images/24hour.png' },
  { icon: MdLocalLaundryService, title: 'Dry', description: 'Dry your clothes quickly with our powerful dryers.', img: '/images/24hour.png' },
];

const pricingPlans: PricingPlan[] = [
  { title: 'Quick wash 15 mins', price: 'KSh 500', capacity: 'Up to 8 kg' },
  { title: '30 min wash', price: 'KSh 700', capacity: 'Up to 12 kg' },
  { title: 'Large Load', price: 'KSh 1000', capacity: 'Up to 16 kg' },
];

const testimonials: Testimonial[] = [
  { id: '1', content: 'MEL Laundry has made my life so much easier. Clean clothes, no hassle!', author: 'Dralagar George' },
  { id: '2', content: 'The 24/7 availability is a game-changer. I can do laundry on my schedule.', author: 'Christine' },
  { id: '3', content: 'Affordable and efficient. MEL Laundry is my go-to for all my laundry needs.', author: 'Dodo' },
];

// Team members data
const teamMembers: TeamMember[] = [
  { name: 'John Doe', position: 'Founder & CEO', image: '/images/dryer.png' },
  { name: 'Jane Smith', position: 'Operations Manager', image: '/images/shirts.png' },
  { name: 'Emily Johnson', position: 'Marketing Lead', image: '/images/stophnging.png' },
  { name: 'Michael Brown', position: 'Finance Manager', image: '/images/redwhite.png' },
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
          <p className={styles.heroDescription}>Enjoy fast, efficient, and affordable self-service laundry at our convenient locations across Nairobi.</p>
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
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>Why Choose MEL Laundry?</motion.h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div key={index} className={styles.featureItem} variants={fadeInUp}>
              <Image src={feature.img} alt={feature.title} width={64} height={64} className={styles.featureImage} />
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
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>How It Works</motion.h2>
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
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>Our Pricing</motion.h2>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} className={styles.pricingItem} variants={fadeInUp}>
              <h3 className={styles.itemTitle}>{plan.title}</h3>
              <p className={styles.price}>{plan.price}</p>
              <p>{plan.capacity}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Meet the Team Section */}
      <motion.section
        className={styles.meetTheTeam}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>Meet the Team</motion.h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <motion.div key={index} className={styles.teamMember} variants={fadeInUp}>
              <Image src={member.image} alt={member.name} width={150} height={150} className={styles.teamImage} />
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
        <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>What Our Customers Say</motion.h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} className={styles.testimonialItem} variants={fadeInUp}>
              <p>{testimonial.content}</p>
              <h4>- {testimonial.author}</h4>
            </motion.div>
          ))}
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
        <p className={styles.ctaText}>Convenient, fast, and affordable self-service laundry in Nairobi.</p>
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
