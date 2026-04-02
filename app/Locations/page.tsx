"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaDirections } from 'react-icons/fa';
import { getLocations } from '../../lib/api';
import styles from '../styless/Locations.module.css';

interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  status: 'active' | 'inactive';
  phone?: string;
  hours?: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLocations() {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.warn('API failed, using fallback location:', err);
        // Fallback to Donholm CFF location if API fails
        setLocations([{
          _id: '1',
          name: 'MEL Laundry - Donholm CFF',
          address: 'Donholm CFF Plaza, Ground Floor',
          city: 'Nairobi',
          state: 'Nairobi County',
          zipCode: '00100',
          image: '/images/inside.jpg',
          status: 'active',
          phone: '+254 769 003443',
          hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM',
          description: 'Our flagship location offering premium laundry services with state-of-the-art equipment and professional staff.',
          coordinates: { lat: -1.2921, lng: 36.8219 }
        }]);
      } finally {
        setLoading(false);
      }
    }

    loadLocations();
  }, []);

  const handleGetDirections = (location: Location) => {
    if (location.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const handleCallLocation = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (loading) {
    return (
      <div className={styles.locationsContainer}>
        <div className={styles.heroContainer}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/About.jpg"
              alt="MEL Laundry Locations"
              fill
              className={styles.heroImage}
              quality={90}
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.imageOverlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Our Locations</h1>
            <p className={styles.heroDescription}>
              Find your nearest MEL Laundry service center
            </p>
          </div>
        </div>
        
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.locationsContainer}>
      {/* Hero Section */}
      <div className={styles.heroContainer}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/About.jpg"
            alt="MEL Laundry Locations"
            fill
            className={styles.heroImage}
            quality={90}
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.imageOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Locations</h1>
          <p className={styles.heroDescription}>
            {locations.length === 1 
              ? `Visit our ${locations[0].name} location`
              : 'Find your nearest MEL Laundry service center'
            }
          </p>
        </div>
      </div>

      {/* Locations Content */}
      <div className={styles.contentSection}>
        {locations.length === 0 ? (
          <div className={styles.noLocations}>
            <FaMapMarkerAlt className={styles.noLocationsIcon} />
            <h2>No Locations Available</h2>
            <p>We&apos;re currently expanding. Check back soon for new locations!</p>
          </div>
        ) : (
          <>
            {/* Single Location Layout */}
            {locations.length === 1 && (
              <motion.div 
                className={styles.singleLocationHero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.locationImageWrapper}>
                  <Image
                    src={locations[0].image || '/images/inside.jpg'}
                    alt={locations[0].name}
                    fill
                    className={styles.locationImage}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={styles.imageGradient}></div>
                </div>
                
                <div className={styles.locationContent}>
                  <div className={styles.locationHeader}>
                    <h2 className={styles.locationName}>{locations[0].name}</h2>
                    <span className={`${styles.statusBadge} ${styles.statusActive}`}>
                      <FaStar className={styles.statusIcon} />
                      Active
                    </span>
                  </div>
                  
                  <p className={styles.locationDescription}>
                    {locations[0].description || 'Your trusted laundry service provider with professional equipment and excellent customer service.'}
                  </p>
                  
                  <div className={styles.locationDetails}>
                    <div className={styles.detailItem}>
                      <FaMapMarkerAlt className={styles.detailIcon} />
                      <div>
                        <h3>Address</h3>
                        <p>{locations[0].address}</p>
                        <p>{locations[0].city}, {locations[0].state} {locations[0].zipCode}</p>
                      </div>
                    </div>
                    
                    {locations[0].phone && (
                      <div className={styles.detailItem}>
                        <FaPhone className={styles.detailIcon} />
                        <div>
                          <h3>Phone</h3>
                          <p>{locations[0].phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {locations[0].hours && (
                      <div className={styles.detailItem}>
                        <FaClock className={styles.detailIcon} />
                        <div>
                          <h3>Hours</h3>
                          <p>{locations[0].hours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.actionButtons}>
                    <button 
                      onClick={() => handleGetDirections(locations[0])}
                      className={styles.primaryButton}
                    >
                      <FaDirections className={styles.buttonIcon} />
                      Get Directions
                    </button>
                    
                    {locations[0].phone && (
                      <button 
                        onClick={() => handleCallLocation(locations[0].phone!)}
                        className={styles.secondaryButton}
                      >
                        <FaPhone className={styles.buttonIcon} />
                        Call Now
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Multiple Locations Grid */}
            {locations.length > 1 && (
              <div className={styles.locationsGrid}>
                {locations.map((location, index) => (
                  <motion.div
                    key={location._id}
                    className={styles.locationCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={location.image || '/images/inside.jpg'}
                        alt={location.name}
                        fill
                        className={styles.cardImage}
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className={`${styles.statusBadge} ${location.status === 'active' ? styles.statusActive : styles.statusInactive}`}>
                        {location.status}
                      </span>
                    </div>
                    
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{location.name}</h3>
                      <p className={styles.cardAddress}>{location.address}</p>
                      <p className={styles.cardCity}>
                        {location.city}, {location.state} {location.zipCode}
                      </p>
                      
                      {location.phone && (
                        <p className={styles.cardPhone}>
                          <FaPhone className={styles.cardIcon} />
                          {location.phone}
                        </p>
                      )}
                      
                      {location.hours && (
                        <p className={styles.cardHours}>
                          <FaClock className={styles.cardIcon} />
                          {location.hours}
                        </p>
                      )}
                      
                      <div className={styles.cardActions}>
                        <button 
                          onClick={() => handleGetDirections(location)}
                          className={styles.cardButton}
                        >
                          <FaDirections />
                          Directions
                        </button>
                        {location.phone && (
                          <button 
                            onClick={() => handleCallLocation(location.phone!)}
                            className={styles.cardButton}
                          >
                            <FaPhone />
                            Call
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}