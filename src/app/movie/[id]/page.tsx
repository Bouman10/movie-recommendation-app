"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getMovieDetails,
  getMovieCast,
  getMovieVideos,
  getImageUrl,
} from "@/lib/api";
import { Movie, Cast, Video } from "@/interfaces/movie";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const movieData = await getMovieDetails(id as string);
      const castData = await getMovieCast(id as string);
      const videoData = await getMovieVideos(id as string);
      setMovie(movieData);
      setCast(castData);
      setVideos(videoData);
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return (
      <main className="p-6 text-center">
        <p className="text-gray-400">Loading movie details...</p>
      </main>
    );
  }

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

      {/* Movie Hero Section */}
      <div className="mb-8">
        <Image
          src={getImageUrl(movie.backdrop_path || movie.poster_path, "w780")}
          alt={movie.title}
          width={1200}
          height={600}
          className="rounded-xl shadow-lg object-cover w-full h-[400px]"
        />
        <h1 className="mt-4 text-3xl font-bold">{movie.title}</h1>
        <p className="text-gray-400 mt-2">{movie.overview}</p>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cast.slice(0, 10).map((actor) => (
              <div key={actor.id} className="text-center">
                <Image
                  src={getImageUrl(actor.profile_path)}
                  alt={actor.name}
                  width={150}
                  height={225}
                  className="rounded-lg object-cover mx-auto"
                />
                <h3 className="mt-2 text-sm font-medium">{actor.name}</h3>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trailer Section */}
      {videos.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Trailer</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videos[0].key}`}
              title={videos[0].name}
              allowFullScreen
            />
          </div>
        </section>
      )}
    </main>
  );
}
