  "use client";

  import { useState, useEffect } from 'react';
  import Link from 'next/link';
  import Image from 'next/image';
  import { usePathname } from 'next/navigation';
  import styles from '../styless/Navbar.module.css'; 

  const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu on window resize to desktop width
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) setIsOpen(false);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/service', label: 'Services' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' }
    ];

    return (
      <nav className={`${styles.nav} ${styles.fixedNav}`} aria-label="Main navigation">
        {/* Logo Section */}
        <div className={styles.logo}>
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/images/logo.png"
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
        <ul
          className={`${styles.navList} ${isOpen ? styles.show : ''}`}
          aria-hidden={!isOpen ? true : undefined}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link 
                href={href}
                onClick={closeMenu}
                className={pathname === href ? styles.active : ''}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default NavBar;
