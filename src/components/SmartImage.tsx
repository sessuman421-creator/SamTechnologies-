import { useState } from 'react';
import { Layers } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function SmartImage({ src, alt, fallbackTitle, className = '' }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#14171D] text-[#F3F4F6] p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-7 h-7 text-[#60A5FA] mb-3" strokeWidth={1.5} />
        <span className="font-display text-base font-semibold tracking-tight">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
