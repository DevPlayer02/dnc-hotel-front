"use client";
import Image from "next/image";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const MAX_SIZE = 300 * 1024;

const ImageField = ({ id, label, name }: ImageFieldProps) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null);
  const [exceededImageSize, setExceededImageSize] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];
    const reader = new FileReader();

    setExceededImageSize((file?.size as number) > MAX_SIZE);

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label htmlFor={id} className="cursor-pointer flex flex-col items-center">
        <Image
          src={typeof image === "string" ? image : "/default-profile.jpg"}
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
      />
    </div>
  );
};

export default ImageField;
