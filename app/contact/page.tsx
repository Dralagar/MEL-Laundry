'use client';

import React, { useState } from 'react';
import styles from '../styless/Contact.module.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

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
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section className={styles.contactRoot}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Get in Touch</h2>
        <div className={styles.contentWrapper}>
          <form className={styles.form} onSubmit={handleSubmit} aria-label="Contact form">
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
            <button type="submit" className={styles.button} aria-label="Send message">
              <FaPaperPlane className={styles.buttonIcon} />
              Send Message
            </button>
          </form>

          <div className={styles.infoContainer}>
            <div className={styles.card}>
              <FaMapMarkerAlt className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Our Office</h3>
            </div>
            <div className={styles.card}>
              <FaEnvelope className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Email Us</h3>
              <p className={styles.cardText}>mel.tamabra@gmail.com</p>
            </div>
            <div className={styles.card}>
              <FaPhone className={styles.icon} aria-hidden="true" />
              <h3 className={styles.cardHeading}>Call Us</h3>
              <p className={styles.cardText}>+254740630890</p>
            </div>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818917120402!2d36.81985631475815!3d-1.2833309990629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c1%3A0x3b1b3b1b3b1b3b1b!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1633022921234!5m2!1sen!2sus"
                className={styles.map}
                allowFullScreen={true}
                loading="lazy"
                title="MEL Laundry Location"
                aria-label="Google Maps location of MEL Laundry"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}