"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styless/Navbar.module.css'; // Corrected path if necessary

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.nav}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <Link href="/" aria-label="Homepage">
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
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Navigation List */}
      <ul className={`${styles.navList} ${isOpen ? styles.show : ''}`} aria-hidden={!isOpen}>
        <li>
          <Link href="/" onClick={closeMenu} aria-label="Home">Home</Link>
        </li>
        
        {/* About Link */}
        <li>
          <Link href="/about" onClick={closeMenu} aria-label="About">About</Link>
        </li>

        {/* Other Links */}
        <li>
          <Link href="/service" onClick={closeMenu} aria-label="Services">Services</Link>
        </li>
        <li>
          <Link href="/blog" onClick={closeMenu} aria-label="Blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeMenu} aria-label="Contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
