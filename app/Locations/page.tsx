"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLocations } from "../../lib/api";

interface Location {
  _id: string;
  name: string;
  address: string;
  image?: string;
}

export default function LocationsPage() {
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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Locations</h1>
      
      {locations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No locations available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div 
              key={location._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {location.image && (
                <div className="relative w-full h-48">
                  <Image 
                    src={`http://localhost:5000/${location.image}`}
                    alt={location.name}
                    fill
                    className="object-cover"
                    onError={(e: any) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
                <p className="text-gray-600">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Link 
        href="/" 
        className="inline-block mt-8 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
