import React from 'react';
import Link from 'next/link';

const Locations: React.FC = () => {
  return (
    <div>
      <h1>Our Locations</h1>
      <p>Here you can find information about our laundry locations.</p>
      {/* Add more content about your locations here */}
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Locations;