"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { Movie, Cast, Video } from "@/interfaces/movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        // 1. Movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);

        // 2. Cast
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast?.slice(0, 5) || []);

        // 3. Videos
        const videosRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videosData = await videosRes.json();
        const officialTrailer = videosData.results?.find(
          (v: Video) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(officialTrailer || null);

        // 4. Recommendations
        const recRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        const recData = await recRes.json();
        setRecommendations(recData.results || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <p className="p-6 text-center">Loading movie details...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Header />

      {/* Back Button */}
      <Button onClick={() => router.back()} className="mb-6">
        ← Back
      </Button>

      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-2">Release Date: {movie.release_date}</p>
          <p className="text-yellow-400 mb-4">
            Rating: ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <p className="mb-4">{movie.overview}</p>

          {/* Add to Favorites */}
          <Button
            onClick={() => {
              const stored = localStorage.getItem("favorites");
              const favorites = stored ? JSON.parse(stored) : [];
              if (!favorites.find((fav: Movie) => fav.id === movie.id)) {
                favorites.push(movie);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                alert(`${movie.title} added to favorites!`);
              } else {
                alert(`${movie.title} is already in favorites.`);
              }
            }}
          >
            Add to Favorites
          </Button>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
        <div className="flex gap-4 overflow-x-auto">
          {cast.map((actor) => (
            <div key={actor.id} className="flex-shrink-0 w-32 text-center">
              {actor.profile_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                  height={150}
                  className="rounded-lg mx-auto"
                />
              )}
              <p className="mt-2 font-medium">{actor.name}</p>
              <p className="text-sm text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Movie Trailer"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Recommended Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white shadow rounded-lg overflow-hidden">
                <Link href={`/movie/${rec.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                    alt={rec.title}
                    width={500}
                    height={750}
                    className="w-full h-72 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{rec.title}</h2>
                  <p className="text-sm text-gray-500">⭐ {rec.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
