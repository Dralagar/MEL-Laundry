"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styless/Navbar.module.css'; 

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {/* Logo Section */}
      <div className={styles.logo}>
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/MELLOGO3.png"
            alt="MEL Logo"
            width={150}
            height={50}
            priority
          />
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Navigation List */}
      <ul className={`${styles.navList} ${isOpen ? styles.show : ''}`} aria-hidden={!isOpen}>
        <li>
          <Link href="/" onClick={closeMenu} aria-label="Navigate to Home page">Home</Link>
        </li>
        
        {/* About Link */}
        <li>
          <Link href="/about" onClick={closeMenu} aria-label="Learn more About us">About</Link>
        </li>

        {/* Other Links */}
        <li>
          <Link href="/service" onClick={closeMenu} aria-label="Explore our Services">Services</Link>
        </li>
        <li>
          <Link href="/blog" onClick={closeMenu} aria-label="Read our Blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeMenu} aria-label="Contact us">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
