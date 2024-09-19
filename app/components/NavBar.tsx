"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styless/Navbar.module.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">MEL Laundry</Link>
      </div>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </button>
      <ul className={`${styles.navList} ${isOpen ? styles.show : ''}`}>
        <li key="/" onClick={closeMenu}>
          <Link href="/">Home</Link>
        </li>

        {/* Dropdown for About */}
        <li
          className={styles.dropdown}
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <span className={styles.navLink}>About</span>
          <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.showDropdown : ''}`}>
            <li key="/about/mission">
              <Link href="/about/mission" onClick={closeMenu}>Our Mission</Link>
            </li>
            <li key="/about/vision">
              <Link href="/about/vision" onClick={closeMenu}>Our Vision</Link>
            </li>
            <li key="/about/values">
              <Link href="/about/values" onClick={closeMenu}>Our Values</Link>
            </li>
          </ul>
        </li>

        <li key="/service">
          <Link href="/service" onClick={closeMenu}>Services</Link>
        </li>
        <li key="/blog">
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
        </li>
        <li key="/contact">
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
