"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLocations, updateLocation } from '../../lib/api';

interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  status?: string;
}

const LocationCard: React.FC<{ location: Location; onUpdate: (id: string, newName: string) => void }> = ({ location, onUpdate }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '12px' }}>
      <h2>{location.name}</h2>
      <p>{location.address}</p>
      <p>{location.city}, {location.state} {location.zipCode}</p>
      <p>Status: {location.status}</p>
      {location.image && (
        <Image
          src={location.image}
          alt={location.name}
          width={100}
          height={100}
          style={{ objectFit: 'cover' }}
        />
      )}
      <button onClick={() => onUpdate(location._id, 'Updated Name')}>Update Name</button>
    </div>
  );
};

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await getLocations();
        setLocations(fetchedLocations);
      } catch (err) {
        setError('Failed to fetch locations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleUpdate = async (id: string, newName: string) => {
    try {
      await updateLocation(id, { name: newName });
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location._id === id ? { ...location, name: newName } : location
        )
      );
    } catch (err) {
      setError('Failed to update location. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Our Locations</h1>
      <p>Here you can find information about our laundry locations.</p>
      
      {locations.length === 0 ? (
        <p>No locations found.</p>
      ) : (
        <div>
          {locations.map((location) => (
            <LocationCard 
              key={location._id} 
              location={location} 
              onUpdate={handleUpdate} 
            />
          ))}
        </div>
      )}
      
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Locations;
