import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Added FaTwitter for X logo
import styles from '../styless/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Brand Section */}
        <div className={`${styles.footerSection} ${styles.brandSection}`}>
          <Link href="/">
            <Image src="/images/washer.png" alt="MEL Laundry Logo" width={100} height={50} />
          </Link>
          <p>Experience hassle-free laundry with our convenient self-service locations across Nairobi.</p>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/locations">Locations</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li>
              <Link href="https://www.google.com/maps/place/Donholm+CFF,+Nairobi" target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt /> Donholm CFF, Nairobi, Kenya
              </Link>
            </li>
            <li>
              <Link href="tel:+254757495125">
                <FaPhone /> +254757495125
              </Link>
            </li>
            <li>
              <Link href="mailto:info@mellaundry.com">
                <FaEnvelope /> info@mellaundry.com
              </Link>
            </li>
            <li>
              <Link href="https://wa.me/+254740630890" target="_blank" rel="noopener noreferrer">
                <FaPhone /> WhatsApp Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links Section */}
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter /> {/* Corrected the icon for Twitter (X) */}
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} MEL Laundry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

