"use client";

import { UnsplashPhoto } from "@/types/unsplash";
import { X, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface PhotoModalProps {
  photo: UnsplashPhoto;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm">
      {/* Backdrop click closes modal */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative z-10 flex flex-col bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">{photo.user.name}</span>
              <a
                href={`https://unsplash.com/@${photo.user.username}?utm_source=vedansh_gallery&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-black transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                @{photo.user.username} on Unsplash
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${photo.links.html}?utm_source=vedansh_gallery&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="View on Unsplash"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative flex items-center justify-center bg-gray-50 p-4 min-h-0 overflow-y-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description || photo.description || "Unsplash Photo"}
              width={photo.width}
              height={photo.height}
              unoptimized
              className="max-w-full max-h-[70vh] object-contain rounded-md shadow-sm"
              style={{ backgroundColor: photo.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}