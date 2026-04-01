"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

function SafeImage({ src, alt, ...props }: { src: string | undefined, alt: string, [key: string]: any }) {
  // const [hasError, setHasError] = useState(false);
  // Check if src is missing or doesn't look like a valid path
  if (!src || src.trim() === '') {
    return null;
  }
  try {
    // This catches "Failed to construct 'URL': Invalid URL"
    // For relative paths (e.g. /logo.png), we provide a dummy base to satisfy the URL constructor
    new URL(src.startsWith('/') ? `https://a.com${src}` : src);
  } catch (error) {
    // If URL is malformed, return null
    return null;
  }

  return <Image src={src} alt={alt} {...props} />;
};

export default function Carousel({ images, alt, changeInterval = 3000, width = 200, height = 200 }: any) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, changeInterval); // Default: Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="border" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }} >
      <SafeImage src={images[carouselIndex]} alt={alt} width={width} height={height} />
      <p>{carouselIndex + 1} of {images.length}</p>
    </div>
  )
}