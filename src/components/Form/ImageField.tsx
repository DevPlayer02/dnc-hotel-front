"use client";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import CustomImage from "../CustomImage";

type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  id: string;
};

const MAX_SIZE = 3 * 1024 * 1024;

const ImageField = ({ id, label, name, ...rest }: ImageFieldProps) => {
  const inputId = id ?? name ?? "image-field";
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exceededImageSize, setExceededImageSize] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setPreviewUrl(null);
      setExceededImageSize(false);
      return;
    }

    setExceededImageSize(file.size > MAX_SIZE);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url); 
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label htmlFor={inputId} className="cursor-pointer flex flex-col items-center">
        <CustomImage
          src={previewUrl ?? "/default-profile.jpg"}
          width={100}
          height={100}
          alt="Profile picture"
          className="rounded-full object-cover w-24 h-24"
        />
        <span className="py-4 px-6 w-full rounded-lg font-bold text-center">
          {label}
        </span>
      </label>
      {exceededImageSize && (
        <span className="text-red-500 text-xs">
          This image exceeds the maximum size of 3MB.
        </span>
      )}
      <input
        type="file"
        name={name}
        id={id}
        className="hidden"
        onChange={handleInputChange}
        {...rest}
      />
    </div>
  );
};

export default ImageField;
