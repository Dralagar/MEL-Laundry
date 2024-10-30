import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLocations } from "../lib/api";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Locations</h1>
      <p className="mb-6">Here you can find information about our laundry locations.</p>
      
      {locations.length === 0 ? (
        <p>No locations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((location) => (
            <div 
              key={location._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
              <p className="mb-1">{location.address}</p>
              <p className="mb-2">{location.city}, {location.state} {location.zipCode}</p>
              {location.status && (
                <p className="mb-2">Status: {location.status}</p>
              )}
              {location.image && (
                <div className="relative w-full h-48 mb-2">
                  <Image 
                    src={location.image} 
                    alt={location.name} 
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <Link 
        href="/" 
        className="inline-block mt-6 text-blue-600 hover:text-blue-800"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Locations;

