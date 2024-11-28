import { useState } from "react";
import { getPhotos, Photo } from "../services/photoServices";

export const usePhotoFetch = (source: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string>("");

  const fetchPhotos = async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setError("Please enter a search term or pick one of our most popular searches below.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const photosData = await getPhotos(source, query, page);
      setPhotos((prevPhotos) => (page === 1 ? photosData : [...prevPhotos, ...photosData]));
      if (photosData.length === 0) {
        setError("No results found. Try searching for something else.");
      }
    } catch (error) {
      console.log("Error fetching photos:", error);
      setError("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return {
    photos,
    loading,
    searchQuery,
    setSearchQuery,
    isSearching,
    setIsSearching,
    page,
    fetchPhotos,
    setPage,
    error,
    setError,
    setPhotos
  };
};
