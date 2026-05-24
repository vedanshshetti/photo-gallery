"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { UnsplashPhoto } from "@/types/unsplash";
import PhotoGrid from "./PhotoGrid";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

export default function PhotoGallery() {
  const [allPhotos, setAllPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [query, setQuery] = useState("");
  const [orientation, setOrientation] = useState("");
  const [color, setColor] = useState("");
  const [orderBy, setOrderBy] = useState("latest");

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("order_by", orderBy === "latest" ? "latest" : "popular");
      params.append("per_page", "100"); // Fetch more for client-side filtering

      const res = await fetch(`/api/photos?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch photos");

      const data = await res.json();
      setAllPhotos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

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
        <SearchBar query={query} setQuery={setQuery} />
        
        <FilterBar
          orientation={orientation}
          setOrientation={setOrientation}
          color={color}
          setColor={setColor}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span>Showing @vedanshshetti's portfolio only.</span>
      </div>

      {error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 w-full rounded-lg"></div>
          ))}
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No photos found matching your criteria.</div>
      ) : (
        <PhotoGrid photos={filteredPhotos} />
      )}
    </div>
  );
}