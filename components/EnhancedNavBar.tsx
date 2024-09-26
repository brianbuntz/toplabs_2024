// components/EnhancedNavBar.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface EnhancedNavBarProps {
  items: BreadcrumbItem[];
  imageSrc: string;
}

const EnhancedNavBar: React.FC<EnhancedNavBarProps> = ({ items, imageSrc }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col">
        <Link href="/categories" className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-2">
          <ChevronLeft size={16} />
          <span>Back to Categories</span>
        </Link>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && <span className="text-gray-500">/</span>}
                <li>
                  {index === items.length - 1 ? (
                    <span className="text-gray-700">{item.name}</span>
                  ) : (
                    <Link href={item.href} className="text-blue-600 hover:text-blue-800">
                      {item.name}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
      <div className="w-1/4">
        <Image 
          src={imageSrc} 
          alt="Category image" 
          width={200} 
          height={100} 
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default EnhancedNavBar;