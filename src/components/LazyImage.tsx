import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function LazyImage({ src, alt, className = '', referrerPolicy }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-100">
      {/* Elegant minimalist pulse placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-100">
          <div className="w-full h-full animate-pulse bg-neutral-200" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy={referrerPolicy}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-1000 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
