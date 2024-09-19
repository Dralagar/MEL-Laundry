import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from '../styless/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={`${styles.footerSection} ${styles.brandSection}`}>
          <Image src="/images/washer.png" alt="MEL Laundry Logo" width={100} height={50} />
          <p>Experience hassle-free laundry with our convenient self-service locations across Nairobi.</p>
        </div>
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
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li><FaMapMarkerAlt /> Donholm CFF, Nairobi, Kenya</li>
            <li><FaPhone /> +254 7024855568</li>
            <li><FaEnvelope /> info@mellaundry.com</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
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