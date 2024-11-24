"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getLocations } from '../../lib/api';

interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image?: string;
  status: 'active' | 'inactive';
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
        setError('Failed to load locations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLocations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div 
            key={location._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {location.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${location.image}`}
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
              <p className="text-gray-600 mb-1">{location.address}</p>
              <p className="text-gray-600 mb-2">
                {location.city}, {location.state} {location.zipCode}
              </p>
              <span 
                className={`inline-block px-2 py-1 rounded-full text-sm ${
                  location.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {location.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
