"use client";

import { UnsplashPhoto } from "@/types/unsplash";
import { useState } from "react";
import PhotoCard from "./PhotoCard";
import PhotoModal from "./PhotoModal";

export default function PhotoGrid({ photos }: { photos: UnsplashPhoto[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <PhotoCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
}