import { Movie, Cast, Video } from "@/interfaces/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "dfb5315d5a6b784e9205bfca58194bad";

// Build image URL safely
export const getImageUrl = (
  path: string | null | undefined,
  size: string = "w500"
): string => {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder.png"; // fallback safe image
};

// Fetch Trending Movies
export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch trending movies");
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error in getTrendingMovies:", err);
    return [];
  }
}

// Fetch Recommended Movies (popular)
export async function getRecommendedMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch recommended movies");
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error in getRecommendedMovies:", err);
    return [];
  }
}

// Fetch Single Movie Details
export async function getMovieDetails(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return await res.json();
  } catch (err) {
    console.error("Error in getMovieDetails:", err);
    return null;
  }
}

// Fetch Cast
export async function getMovieCast(id: string): Promise<Cast[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch movie cast");
    const data = await res.json();
    return data.cast || [];
  } catch (err) {
    console.error("Error in getMovieCast:", err);
    return [];
  }
}

// Fetch Videos (trailers, teasers, etc.)
export async function getMovieVideos(id: string): Promise<Video[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch movie videos");
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error in getMovieVideos:", err);
    return [];
  }
}
