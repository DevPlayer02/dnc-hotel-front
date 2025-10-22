"use client";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import CustomImage from "../CustomImage";

type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  id: string;
  defaultValue?: string | null;
  onFileSelect?: (file: File | null) => void;
};

const MAX_SIZE = 800 * 1024;

const ImageField = ({
  id,
  label,
  defaultValue = "",
  onFileSelect,
  name,
  ...rest
}: ImageFieldProps) => {
  const inputId = id ?? name ?? "image-field";
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue);
  const [exceededImageSize, setExceededImageSize] = useState(false);

  useEffect(() => {
    setPreviewUrl(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setExceededImageSize(false);
      onFileSelect?.(null);
      setPreviewUrl(defaultValue);
      return;
    }

    if (file.size > MAX_SIZE) {
      setExceededImageSize(true);
      onFileSelect?.(null);
      return;
    }

    setExceededImageSize(false);

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect?.(file);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label
        htmlFor={inputId}
        className="cursor-pointer flex flex-col items-center"
      >
        <CustomImage
          src={previewUrl ?? "/default-image.png"}
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
