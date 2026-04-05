import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
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
              src="/images/Washer.png" 
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
            <li><Link href="/blog" aria-label="Read our Blog">Blog</Link></li>
            <li><Link href="/contact" aria-label="Contact Us">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Us Section - Icons aligned properly */}
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <ul className={styles.contactList}>
            <li>
              <Link 
                href="https://www.google.com/maps/place/SHILOH+Towers,+Opposite+CFF+DONHOLM.+Off+Manyanja+Rd.,+Nairobi,+Kenya" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View our location on Google Maps"
                className={styles.contactLink}
              >
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>Shiloh Towers, Opposite CFF Donholm, Off Manyanja Rd, Nairobi, Kenya</span>
              </Link>
            </li>
            <li>
              <Link 
                href="tel:+254769003443" 
                aria-label="Phone Number: Call us at +254769003443"
                className={styles.contactLink}
              >
                <FaPhone className={styles.contactIcon} />
                <span>+254769003443</span>
              </Link>
            </li>
            <li>
              <Link 
                href="mailto:mel.tamabra@gmail.com" 
                aria-label="Email us at mel.tamabra@gmail.com"
                className={styles.contactLink}
              >
                <FaEnvelope className={styles.contactIcon} />
                <span>mel.tamabra@gmail.com</span>
              </Link>
            </li>
            <li>
              <Link 
                href="https://wa.me/+254769003443" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chat with us on WhatsApp"
                className={styles.contactLink}
              >
                <FaWhatsapp className={styles.contactIcon} />
                <span>WhatsApp Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links Section - Using X/Twitter image */}
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <Link 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit our Facebook page"
              className={styles.socialLink}
            >
              <FaFacebook />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit our X (Twitter) page"
              className={styles.socialLink}
            >
              <div className={styles.xImageWrapper}>
                <Image 
                  src="/images/Xlogo.png" 
                  alt="X (Twitter)" 
                  width={20} 
                  height={20}
                  className={styles.xImage}
                />
              </div>
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Visit our Instagram page"
              className={styles.socialLink}
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.bottomLinks}>
          <Link 
            href="https://www.google.com/maps/place/SHILOH+Towers,+Opposite+CFF+DONHOLM.+Off+Manyanja+Rd.,+Nairobi,+Kenya" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View our location on Google Maps"
            className={styles.bottomLink}
          >
            <FaMapMarkerAlt className={styles.bottomIcon} />
            <span>Shiloh Towers, Opposite CFF Donholm, Off Manyanja Rd, Nairobi, Kenya</span>
          </Link>
          <Link 
            href="tel:+254769003443" 
            aria-label="Call us at +254769003443"
            className={styles.bottomLink}
          >
            <FaPhone className={styles.bottomIcon} />
            <span>+254769003443</span>
          </Link>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {currentYear} MEL Laundry. All rights reserved.</p>
          <p>Built by ReactNowDev</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;