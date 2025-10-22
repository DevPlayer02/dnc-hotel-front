"use client";
import React, { useState, useEffect } from "react";
import { normalizeImageSrc, UploadPathKey, SrcType } from "@/helpers/format/image";

type SrcType = string | Record<string, unknown> | null | undefined;

type Props = {
  src?: SrcType;
  hotel?: Record<string, unknown>;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  baseUrl?: string;
  uploadsPath?: UploadPathKey | string; 
  placeholder?: string;
  unoptimized?: boolean;
} & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
>;

function extractHotelImage(hotel?: Record<string, unknown>): SrcType {
  if (!hotel || typeof hotel !== "object") return null;
  if (hotel.image) return hotel.image;
  if (Array.isArray(hotel.images) && hotel.images.length)
    return hotel.images[0];
  if (hotel.owner && hotel.owner.avatar) return hotel.owner.avatar;
  return null;
}

export default function CustomImage({
  src,
  hotel,
  alt,
  width,
  height,
  className,
  baseUrl,
  uploadsPath,
  placeholder,
  ...rest
}: Props) {
  
  const inputSource: SrcType = src ?? (hotel ? extractHotelImage(hotel) : null);
  const normalized = normalizeImageSrc(inputSource, {
    base: baseUrl,
    uploadsPath: uploadsPath as string,
    placeholder,
  });
  const [currentSrc, setCurrentSrc] = useState<string>(normalized);
  
  useEffect(() => {
    setCurrentSrc(normalized);
  }, [normalized]);
  
  function handleError() {
    const fallback = placeholder ?? "/placeholder.png";
    if (currentSrc !== fallback) setCurrentSrc(fallback);
  }
  
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError as React.ReactEventHandler<HTMLImageElement>}
      {...rest}
    />
  );
}
