
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium', withText = true }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-16'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/013eac99-6fd8-4dc3-a892-a0e24df377a9.png" 
        alt="MyHelper Logo" 
        className={`${sizeClasses[size]} ${!withText ? 'rounded-full' : ''}`}
      />
    </Link>
  );
};

export default Logo;
