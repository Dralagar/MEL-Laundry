"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTshirt, FaTruck, FaWind } from 'react-icons/fa';
import { GiWashingMachine } from 'react-icons/gi';
import Image from 'next/image';
import styles from '../styless/Service.module.css';

const ServicePage: React.FC = () => {
  const [activeService, setActiveService] = useState('self-service');

  const services = {
    'self-service': {
      icon: GiWashingMachine,
      title: "Self-Service Laundry",
      description:
        "Our state-of-the-art self-service laundry facilities are available 24/7. Use our high-capacity washers and dryers at your convenience.",
      features: [
        "24/7 access",
        "High-capacity machines",
        "Affordable rates",
        "Clean and comfortable environment",
      ],
      image: (
        <Image
          src="/images/washer.png" 
          alt="MEL Laundry Hero"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
          className={styles.bgImage}
        />
      ),
    },
    'dry-cleaning': {
      icon: FaTshirt,
      title: "Professional Dry Cleaning",
      description:
        "Trust our expert dry cleaning services for your delicate fabrics and special garments. We use eco-friendly solvents and advanced techniques.",
      features: [
        "Expert handling of delicate fabrics",
        "Stain removal",
        "Pressing and finishing",
        "Quick turnaround time",
        "Folding and Ironing",
      ],
    },
    'pickup-delivery': {
      icon: FaTruck,
      title: "Pickup & Delivery",
      description:
        "Enjoy the convenience of our pickup and delivery service. We'll collect your laundry and return it clean and fresh to your doorstep.",
      features: [
        "Scheduled pickups",
        "Contactless delivery",
        "Real-time tracking",
        "Customized service options",
      ],
    },
    'commercial': {
      icon: FaWind,
      title: "Commercial Laundry Solutions",
      description:
        "We offer tailored laundry solutions for businesses of all sizes. From hotels to restaurants, we've got your commercial laundry needs covered.",
      features: [
        "High-volume capacity",
        "Industry-specific solutions",
        "Flexible scheduling",
        "Competitive pricing",
      ],
    },
  };

  const handleWhatsAppBooking = () => {
    window.open("https://wa.me/+254706255611", "_blank");
  };

  return (
    <div>
      <div className={styles.heroContainer}>
        {services['self-service'].image} {/* Background Image */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h1>
      </div>

      <div className={styles.serviceButtons}>
        {Object.entries(services).map(([key, service]) => (
          <motion.button
            key={key}
            className={`${styles.serviceButton} ${activeService === key ? styles.active : ""}`}
            onClick={() => setActiveService(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Select ${service.title}`}
          >
            {React.createElement(service.icon, { className: styles.serviceIcon })}
            {service.title}
          </motion.button>
        ))}
      </div>

      <motion.div
        className={styles.serviceDetails}
        key={activeService}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{services[activeService].title}</h2>
        <p>{services[activeService].description}</p>
        <ul className={styles.featureList}>
          {services[activeService].features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2>Ready to experience our top-notch laundry services?</h2>
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppBooking}
        >
          Book Now via WhatsApp
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ServicePage;
