"use client";

import { UnsplashPhoto } from "@/types/unsplash";
import { X, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslations } from "@/i18n/useTranslations";

interface PhotoModalProps {
  photo: UnsplashPhoto;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  const { t } = useTranslations();

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const downloadUrl = `${photo.links.download}?utm_source=vedansh_gallery&utm_medium=referral`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm">
      {/* Backdrop click closes modal */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative z-10 flex flex-col bg-[color:var(--background-color)] rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[color:var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-semibold text-[color:var(--text-color)]">
                {photo.user.name}
              </span>
              <a
                href={`https://unsplash.com/@${photo.user.username}?utm_source=vedansh_gallery&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[color:var(--muted-text-color)] hover:text-[color:var(--text-color)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {t("modal.userAttribution", {
                  name: `@${photo.user.username}`,
                })}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${photo.links.html}?utm_source=vedansh_gallery&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[color:var(--muted-text-color)] hover:text-[color:var(--text-color)] hover:bg-[color:var(--surface-color)] rounded-full transition-colors"
              title={t("modal.viewOnUnsplash")}
              aria-label={t("modal.viewOnUnsplash")}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[color:var(--muted-text-color)] hover:text-[color:var(--text-color)] hover:bg-[color:var(--surface-color)] rounded-full transition-colors"
              title={t("modal.download")}
              aria-label={t("modal.download")}
            >
              <Download className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-[color:var(--muted-text-color)] hover:text-[color:var(--text-color)] hover:bg-[color:var(--surface-color)] rounded-full transition-colors"
              title={t("modal.close")}
              aria-label={t("modal.close")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative flex items-center justify-center bg-[color:var(--surface-color)] p-4 min-h-0 overflow-y-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={photo.urls.regular}
              alt={
                photo.alt_description ||
                photo.description ||
                t("labels.photoFallback")
              }
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
