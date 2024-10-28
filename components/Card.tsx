// components/Card.tsx

import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 transform transition-transform duration-300 hover:scale-105 hover:bg-opacity-80">
    <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
    {children}
  </div>
);

export default Card;
