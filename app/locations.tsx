import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLocations } from '../lib/api'; 

interface Location {
  id: string;
  name: string;
  address: string;
  image?: string; // Optional, adjust according to your schema
}

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
            <div key={location.id}>
              <h2>{location.name}</h2>
              <p>{location.address}</p>
              {location.image && <img src={location.image} alt={location.name} style={{ width: '100px', height: '100px' }} />}
            </div>
          ))}
        </div>
      )}
      
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Locations;
