import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <Link href="/" className="text-2xl font-bold text-red-600">
        🎬 MovieReco
      </Link>
      <Link
        href="/favorites"
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Favorites
      </Link>
    </header>
  );
}
