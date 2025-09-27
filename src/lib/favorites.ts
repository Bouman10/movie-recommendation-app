import { Movie } from "@/interfaces/movie";

const FAVORITES_KEY = "favorites";

export function getFavorites(): Movie[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(movie: Movie) {
  const favorites = getFavorites();
  if (!favorites.find((fav) => fav.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(movieId: number) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(movieId: number): boolean {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === movieId);
}
