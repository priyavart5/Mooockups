// types/unsplash.d.ts

export interface UnsplashPhoto {
    id: string;
    urls: {
        small: string;
        full: string;
        regular: string;
        raw: string;
    };
    alt_description: string;
}

export interface UnsplashSearchResponse {
    results: UnsplashPhoto[];
    total: number;
    total_pages: number;
}
