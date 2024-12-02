export interface Photo {
    webformatURL: string;
    largeImageURL: string;
    id: string;
    urls: { small: string, full: string};
    alt_description: string;
  }
  
  export const getPhotos = async (
    source: string, 
    query: string, 
    page: number = 1
  ): Promise<Photo[]> => {
    if (source === "unsplash") {
      return getUnsplashPhotos(query, page);
    }
    if (source === "pixabay") {
      return getPixabayPhotos(query, page);
    }
    throw new Error("Invalid photo source");
  };
  
  // Unsplash service
  const UNSPLASH_BASE_URL = "https://api.unsplash.com";
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  const getUnsplashPhotos = async (query: string, page: number = 1): Promise<Photo[]> => {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${query}&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results;
  };
  
  // Pixabay service
  const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
  
  const getPixabayPhotos = async (query: string, page: number = 1): Promise<Photo[]> => {
    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${query}&page=${page}&per_page=20`
    );
    const data = await response.json();
    return data.hits;
  };