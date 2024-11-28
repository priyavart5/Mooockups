// components/BackGroundInteraction.tsx
import React from "react";
import { Minus, Search, X, Ellipsis } from "lucide-react";
import { predefinedQueries } from "../../utils/defaultData";
import { usePhotoFetch } from "../../hooks/usePhotoFetch";
import styles from "./styles.module.scss";

interface BackgroundIntegrationProps {
  onClose: () => void;
  source: string;
}

const BackGroundInteraction: React.FC<BackgroundIntegrationProps> = ({ onClose, source }) => {
  const { photos, loading, searchQuery, setSearchQuery, isSearching, setIsSearching, page, fetchPhotos, setPage, error, setPhotos, setError } = usePhotoFetch(source);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      fetchPhotos(searchQuery.trim());
    } else {
      setError("Please enter a search term or pick one of our most popular searches below.");
    }
  };

  const handlePredefinedQueryClick = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    fetchPhotos(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setPhotos([]);
    setError("");
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPhotos(searchQuery, nextPage);
  };

  // const handleImageClick = (imageUrl: string) => {
  //   dispatch(setSelectedImage(imageUrl));
  // };

  return (
    <div className={styles.backgroundIntegration}>
      <div className={styles.BGI_topBar}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search photos..."
          className={styles.BGI_topBar_searchInput}
          disabled={isSearching}
        />
        {!isSearching && (
          <div className={styles.BGI_topBar_Icon} onClick={handleSearch}>
            <span>
              <Search color="#EFEFEF" size={18} strokeWidth={1} />
            </span>
          </div>
        )}
        {isSearching && (
          <div className={styles.BGI_topBar_Icon} onClick={handleClearSearch}>
            <span>
              <Minus color="#EFEFEF" size={18} strokeWidth={1} />
            </span>
          </div>
        )}
        <div className={styles.BGI_topBar_Icon} onClick={onClose}>
          <span>
            <X color="#EFEFEF" size={18} strokeWidth={1} />
          </span>
        </div>
      </div>

      {/* Display error messages */}
      {error && <div className={styles.BGI_errorMessage}>{error}</div>}

      {!isSearching && (
        <div className={styles.BGI_predefinedQueries}>
          <p>Popular Searches:</p>
          <div className={styles.BGI_preQuery_buttons}>
            {predefinedQueries.map((query) => (
              <button
                key={query}
                onClick={() => handlePredefinedQueryClick(query)}
                className={styles.BGI_preQuery_button}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {!error && isSearching && (
        <div className={styles.BGI_FetchContainer}>
          {loading && page === 1 && <p>Loading...</p>}

          <div className={styles.BGI_FetchContainer_gallery}>
            {photos.map((photo) => {
              return (
              <div className={styles.BGI_imageWrapper} key={photo.id}>
                <img
                  src={source === "unsplash" ? photo.urls.small : photo.webformatURL}
                  alt={photo.alt_description || "Photo"}
                />
              </div>
              )
            })}
          </div>

          {photos.length > 0 && !loading && (
            <button className={styles.BGI_FetchContainer_loadMore} onClick={handleLoadMore}>
              <Ellipsis color="#EFEFEF" size={24} />
            </button>
          )}

          {loading && page > 1 && <p className={styles.BGI_FetchContainer_loadMoreMessage}>Loading...</p>}
        </div>
      )}
    </div>
  );
};

export default BackGroundInteraction;
