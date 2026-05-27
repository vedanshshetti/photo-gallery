"use client";

import { UnsplashPhoto } from "@/types/unsplash";
import Image from "next/image";
import { useTranslations } from "@/i18n/useTranslations";

interface PhotoCardProps {
  photo: UnsplashPhoto;
  onClick: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const { t } = useTranslations();
  const label =
    photo.alt_description || photo.description || t("labels.photoFallback");

  return (
    <button
      type="button"
      className="group relative w-full text-left cursor-pointer overflow-hidden rounded-xl bg-[color:var(--surface-color)] shadow-sm border border-transparent hover:border-[color:var(--border-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-color)] transition"
      onClick={onClick}
      aria-label={label}
    >
      <Image
        src={photo.urls.small}
        alt={label}
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
    </button>
  );
}
