"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Movie } from "@/interfaces/movie";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  if (!favorites.length) {
    return (
      <main className="p-6">
        <Header />
        <h1 className="text-3xl font-bold mb-6">Favorites</h1>
        <p className="text-gray-500">You haven’t added any favorite movies yet.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <div key={movie.id} className="bg-white shadow rounded-lg overflow-hidden">
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-72 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-500">⭐ {movie.vote_average}</p>
              <Button
                onClick={() => {
                  const updated = favorites.filter((fav) => fav.id !== movie.id);
                  setFavorites(updated);
                  localStorage.setItem("favorites", JSON.stringify(updated));
                  alert(`${movie.title} removed from favorites.`);
                }}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Remove from Favorites
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
