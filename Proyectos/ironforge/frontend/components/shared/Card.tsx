
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', noPadding = false }) => {
  return (
    <div className={`bg-[#111] border-l-4 border-yellow-500 shadow-2xl overflow-hidden ${className}`}>
      {title && (
        <div className="bg-[#222] p-4 border-b border-gray-800">
          <h3 className="text-yellow-500 font-black text-xl tracking-wider">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};
