// Main Movie Interface
export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids?: number[];
}

// Cast Interface
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Video Interface (trailers, teasers, etc.)
export interface Video {
  id: string;
  key: string; // YouTube video key
  name: string;
  site: string;
  type: string; // e.g., "Trailer", "Teaser"
}
