"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { Movie } from "@/interfaces/movie";

export default function Dashboard() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setTrendingMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching trending:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  const heroMovie = trendingMovies[0];
  const rest = trendingMovies.slice(1);

  return (
    <main className="p-6">
      <Header />

      {/* Hero Section */}
      {heroMovie && (
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Trending Now</h1>
          <Link href={`/movie/${heroMovie.id}`}>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
                alt={heroMovie.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <h2 className="text-4xl font-bold text-white mb-2">
                  {heroMovie.title}
                </h2>
                <p className="text-gray-200 line-clamp-2 max-w-xl">
                  {heroMovie.overview}
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Rest of Trending Movies */}
      {rest.length > 0 && (
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {rest.map((movie) => (
              <div
                key={movie.id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
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
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
