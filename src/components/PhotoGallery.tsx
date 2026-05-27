"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { UnsplashPhoto } from "@/types/unsplash";
import PhotoGrid from "./PhotoGrid";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { useTranslations } from "@/i18n/useTranslations";

export default function PhotoGallery() {
  const { t } = useTranslations();
  const [allPhotos, setAllPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filters State
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [orientation, setOrientation] = useState("");
  const [color, setColor] = useState("");
  const [orderBy, setOrderBy] = useState("latest");

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.append("order_by", orderBy === "latest" ? "latest" : "popular");
      params.append("per_page", "100"); // Fetch more for client-side filtering

      const res = await fetch(`/api/photos?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch photos");

      const data = await res.json();
      setAllPhotos(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleSearch = useCallback(() => {
    setQuery(draftQuery);
  }, [draftQuery]);

  const handleClearSearch = useCallback(() => {
    setDraftQuery("");
    setQuery("");
  }, []);

  const handleResetFilters = useCallback(() => {
    setDraftQuery("");
    setQuery("");
    setOrientation("");
    setColor("");
    setOrderBy("latest");
  }, []);

  const hasFilters = Boolean(
    draftQuery || query || orientation || color || orderBy !== "latest",
  );

  const filteredPhotos = useMemo(() => {
    return allPhotos.filter((photo) => {
      // 1. Query Filter
      if (query.trim() !== "") {
        const q = query.toLowerCase();
        const descMatch = photo.description?.toLowerCase().includes(q);
        const altMatch = photo.alt_description?.toLowerCase().includes(q);
        if (!descMatch && !altMatch) return false;
      }

      // 2. Orientation Filter
      if (orientation) {
        const isLandscape = photo.width > photo.height;
        const isPortrait = photo.height > photo.width;
        const isSquare = photo.width === photo.height;

        if (orientation === "landscape" && !isLandscape) return false;
        if (orientation === "portrait" && !isPortrait) return false;
        if (orientation === "squarish" && !isSquare) return false;
      }

      // Note: Color filtering by named color is complex on the client side without Unsplash backend. 
      // It is omitted from strict checks here to prevent incorrect filtering.

      return true;
    });
  }, [allPhotos, query, orientation, color]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchBar
          value={draftQuery}
          onChange={setDraftQuery}
          onSubmit={handleSearch}
          onClear={handleClearSearch}
        />
        
        <FilterBar
          orientation={orientation}
          setOrientation={setOrientation}
          color={color}
          setColor={setColor}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          hasFilters={hasFilters}
          onReset={handleResetFilters}
        />
      </div>
      
      <div className="flex flex-col gap-1 text-sm text-[color:var(--muted-text-color)] mb-2">
        <span>{t("status.portfolioOnly", { name: "@vedanshshetti" })}</span>
        {!loading && !error && (
          <span>
            {t("status.results", {
              shown: filteredPhotos.length,
              total: allPhotos.length,
            })}
          </span>
        )}
      </div>

      {error ? (
        <div className="text-red-500 text-center py-8">
          {t("errors.fetchPhotos")}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          <span className="sr-only" role="status">
            {t("status.loading")}
          </span>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-[color:var(--surface-strong)] h-64 w-full rounded-lg"
            ></div>
          ))}
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-[color:var(--muted-text-color)] text-center py-8">
          {t("status.noResults")}
        </div>
      ) : (
        <PhotoGrid photos={filteredPhotos} />
      )}
    </div>
  );
}
