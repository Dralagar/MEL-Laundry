import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from '../styless/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Brand Section - Add aria-label for better accessibility */}
        <div className={`${styles.footerSection} ${styles.brandSection}`} aria-label="Company branding">
          <Link href="/" aria-label="Home">
            <Image 
              src="/images/washer.png" 
              alt="MEL Laundry Logo" 
              width={100} 
              height={50}
              priority={false}
              loading="lazy"
            />
          </Link>
          <p>Experience hassle-free laundry with our convenient self-service locations across Nairobi.</p>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/" aria-label="Navigate to Home">Home</Link></li>
            <li><Link href="/about" aria-label="Learn more About Us">About Us</Link></li>
            <li><Link href="/service" aria-label="Explore our Services">Services</Link></li>
            <li><Link href="/locations" aria-label="Find our Locations">Locations</Link></li>
            <li><Link href="/contact" aria-label="Contact Us">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li>
              <Link href="https://www.google.com/maps/place/SHILOH+Towers,+Opposite+CFF+DONHOLM.+Off+Manyanja+Rd.,+Nairobi,+Kenya" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View our location on Google Maps">
                <FaMapMarkerAlt /> Shiloh Towers, Opposite CFF Donholm, Off Manyanja Rd, Nairobi, Kenya
              </Link>
            </li>
            <li>
              <Link href="tel:+254740630890" aria-label="Call us at +254740630890">
                <FaPhone />  +254740630890
              </Link>
            </li>
            <li>
              <Link href="mailto:mel.tamabra@gmail.com" aria-label="Email us at mel.tamabra@gmail.com">
                <FaEnvelope /> mel.tamabra@gmail.com
              </Link>
            </li>
            <li>
              <Link href="https://wa.me/+254740630890" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
                <FaPhone /> WhatsApp Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links Section - Add aria-labels */}
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
              <FaFacebook aria-hidden="true" />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">
              <FaTwitter aria-hidden="true" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">
              <FaInstagram aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <ol>
          <Link href="https://www.google.com/maps/place/SHILOH+Towers,+Opposite+CFF+DONHOLM.+Off+Manyanja+Rd.,+Nairobi,+Kenya" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View our location on Google Maps">
            <FaMapMarkerAlt /> Shiloh Towers, Opposite CFF Donholm, Off Manyanja Rd, Nairobi, Kenya
          </Link>
        </ol>
        <ol>
          <Link href="tel:+254740630890" aria-label="Call us at +254740630890">
            <FaPhone />  +254740630890
          </Link>
        </ol>
        <p>&copy; {currentYear} MEL Laundry. All rights reserved.</p>
        <p>Built by ReactNowDev</p>
      </div>
    </footer>
  );
};

export default Footer;

