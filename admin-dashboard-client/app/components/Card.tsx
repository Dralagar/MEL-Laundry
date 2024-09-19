"use client"; // Mark as client component

interface CardProps {
  title: string;
  subtitle: string;
}

export default function Card({ title, subtitle }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}

