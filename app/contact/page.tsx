'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../styless/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.contactRoot}>
      {/* Hero Section */}
      <div className={styles.heroContainer}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/About.jpg"
            alt="MEL Laundry Contact - Professional customer service"
            fill
            className={styles.heroImage}
            quality={90}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.imageOverlay}></div>
        <h1 className={styles.contactHeading}>Contact Us</h1>
      </div>

      {/* Main Content Section */}
      <section className={styles.container}>
        <h2 className={styles.heading}>Get in Touch</h2>
        
        {/* 2-Column Grid Layout */}
        <div className={styles.contentWrapper}>
          {/* Contact Form */}
          <motion.form 
            className={styles.form} 
            onSubmit={handleSubmit} 
            aria-label="Contact form"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your Name"
                aria-required="true"
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="mel.tamabra@gmail.com"
                aria-required="true"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Your Message"
                rows={5}
                aria-required="true"
              />
              {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>
            <button 
              type="submit" 
              className={styles.button} 
              aria-label="Send message"
              disabled={isSubmitting}
            >
              <FaPaperPlane className={styles.buttonIcon} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>

          {/* Contact Info Cards Grid */}
          <div className={styles.infoContainer}>
            <motion.div 
              className={styles.card}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FaMapMarkerAlt className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Our Office</h3>
              <p className={styles.cardText}>Nairobi, Kenya</p>
            </motion.div>
            <motion.div 
              className={styles.card}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FaEnvelope className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Email Us</h3>
              <p className={styles.cardText}>mel.tamabra@gmail.com</p>
            </motion.div>
            <motion.div 
              className={styles.card}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaPhone className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Call Us</h3>
              <p className={styles.cardText}>+254 769 003443</p>
            </motion.div>
            <motion.div 
              className={styles.card}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FaClock className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Business Hours</h3>
              <p className={styles.cardText}>Mon-Fri: 8AM - 8PM</p>
              <p className={styles.cardText}>Sat-Sun: 9AM - 6PM</p>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div 
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818917120402!2d36.81985631475815!3d-1.2833309990629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c1%3A0x3b1b3b1b3b1b3b1b!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1633022921234!5m2!1sen!2sus"
            className={styles.map}
            allowFullScreen={true}
            loading="lazy"
            title="MEL Laundry Location"
            aria-label="Google Maps location of MEL Laundry"
          ></iframe>
        </motion.div>
      </section>
    </div>
  );
}