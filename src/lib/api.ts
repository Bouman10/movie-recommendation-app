const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "dfb5315d5a6b784e9205bfca58194bad";

// Build image URL
export const getImageUrl = (path: string, size: string = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.jpg";

// Fetch Trending Movies
export async function getTrendingMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch trending movies");
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error in getTrendingMovies:", err);
    return [];
  }
}

// Fetch Recommended Movies (for demo, just popular movies)
export async function getRecommendedMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch recommended movies");
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Error in getRecommendedMovies:", err);
    return [];
  }
}
