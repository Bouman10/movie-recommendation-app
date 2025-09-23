import Image from "next/image";
import Link from "next/link";
import { getTrendingMovies, getRecommendedMovies, getImageUrl } from "@/lib/api";

export default async function Dashboard() {
  const trending = await getTrendingMovies();
  const recommended = await getRecommendedMovies();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 MovieRec</h1>
        <Link href="/favorites" className="text-lg hover:underline">
          ❤️ Favorites
        </Link>
      </div>

      {/* Trending Movies */}
      {trending.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🔥 Trending Movies</h2>

          {/* Hero Movie */}
          <div className="mb-8">
            <Image
              src={getImageUrl(trending[0].backdrop_path || trending[0].poster_path)}
              alt={trending[0].title}
              width={1200}
              height={500}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <h2 className="mt-4 text-3xl font-semibold">{trending[0].title}</h2>
            <p className="text-gray-400 mt-2 line-clamp-3">{trending[0].overview}</p>
          </div>

          {/* Next 4 movies */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.slice(1, 5).map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-[250px] object-cover rounded-md group-hover:opacity-80"
                />
                <h3 className="mt-2 text-lg">{movie.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recommended for You */}
      {recommended.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">✨ Recommended for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.slice(0, 8).map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-[250px] object-cover rounded-md group-hover:opacity-80"
                />
                <h3 className="mt-2 text-lg">{movie.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
