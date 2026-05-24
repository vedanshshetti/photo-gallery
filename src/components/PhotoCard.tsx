"use client";

import { UnsplashPhoto } from "@/types/unsplash";
import Image from "next/image";

interface PhotoCardProps {
  photo: UnsplashPhoto;
  onClick: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-sm"
      onClick={onClick}
    >
      <Image
        src={photo.urls.small}
        alt={photo.alt_description || photo.description || "Unsplash Photo"}
        width={photo.width}
        height={photo.height}
        unoptimized
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundColor: photo.color }}
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="text-white text-sm truncate font-medium">
          {photo.user.name}
        </div>
      </div>
    </div>
  );
}