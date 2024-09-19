"use client";

import { useState, useEffect } from 'react';
import { getLocations, addLocation, updateLocation } from '../../lib/api';

import styles from '../styless/Locations.module.css';

interface Location {
  id: string;
  name: string;
  address: string;
  image: string;
}

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', image: '' });

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      setLoading(true);
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    } catch (err) {
      setError('Failed to fetch locations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new location
  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.name || !newLocation.address || !newLocation.image) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const addedLocation = await addLocation(newLocation);
      setLocations((prevLocations) => [...prevLocations, addedLocation]);
      setNewLocation({ name: '', address: '', image: '' });
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to add location. Please try again.');
    }
  };

  // Handle updating an existing location
  const handleUpdateLocation = async (locationId: string, updatedData: Partial<Location>) => {
    try {
      const updatedLocation = await updateLocation(locationId, updatedData);
      setLocations((prevLocations) =>
        prevLocations.map((loc) => (loc.id === locationId ? { ...loc, ...updatedLocation } : loc))
      );
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to update location. Please try again.');
    }
  };

  // Handle input change for adding a new location
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.locationsContainer}>
      <h1 className={styles.title}>Our Locations</h1>

      <form className={styles.addLocationForm} onSubmit={handleAddLocation}>
        <h2>Add New Location</h2>
        <input
          type="text"
          name="name"
          value={newLocation.name}
          onChange={handleInputChange}
          placeholder="Location Name"
          required
        />
        <input
          type="text"
          name="address"
          value={newLocation.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="image"
          value={newLocation.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <button type="submit">Add Location</button>
      </form>

      {locations.length === 0 ? (
        <div className={styles.noLocations}>No locations found.</div>
      ) : (
        <div className={styles.locationGrid}>
          {locations.map((location) => (
            <div key={location.id} className={styles.locationCard}>
              <img
                src={location.image}
                alt={`Image of ${location.name}`}
                className={styles.locationImage}
              />
              <h2 className={styles.locationName}>{location.name}</h2>
              <p className={styles.locationAddress}>{location.address}</p>
              <button
                onClick={() => handleUpdateLocation(location.id, { name: 'Updated Name' })}
              >
                Update Name
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Locations;
