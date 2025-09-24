"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTrendingMovies, getRecommendedMovies, getImageUrl } from "@/lib/api";
import { Movie } from "@/interfaces/movie";

export default function Dashboard() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const trendingData = await getTrendingMovies();
      const recommendedData = await getRecommendedMovies();
      setTrending(trendingData);
      setRecommended(recommendedData);
    };
    fetchData();
  }, []);

  return (
    <main className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <Link href="/" className="text-2xl font-bold text-red-500">
          MovieReco
        </Link>
        <Link
          href="/favorites"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Favorites
        </Link>
      </header>

      {/* Trending Movies */}
      <h2 className="text-xl font-semibold mb-4">Trending Movies</h2>

      {/* Hero Movie (first trending) */}
      {trending.length > 0 && (
        <Link href={`/movie/${trending[0].id}`}>
          <div className="mb-8 cursor-pointer hover:opacity-90 transition">
            <Image
              src={getImageUrl(trending[0].backdrop_path || trending[0].poster_path)}
              alt={trending[0].title}
              width={1200}
              height={600}
              className="rounded-xl shadow-lg object-cover w-full h-[400px]"
            />
            <h1 className="mt-4 text-2xl font-bold">{trending[0].title}</h1>
            <p className="text-gray-400">{trending[0].overview}</p>
          </div>
        </Link>
      )}

      {/* 4 More Trending Movies */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {trending.slice(1, 5).map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="cursor-pointer hover:scale-105 transition">
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg object-cover"
              />
              <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Recommended Movies */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Recommended Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommended.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="cursor-pointer hover:scale-105 transition">
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg object-cover"
              />
              <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
