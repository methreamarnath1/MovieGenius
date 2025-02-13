import React from 'react';
import { MovieCard } from './MovieCard';
import { Bookmark } from 'lucide-react';
import type { Movie } from '../lib/gemini';

interface SavedMoviesProps {
  movies: Movie[];
  onToggleSave: (movie: Movie) => void;
  darkMode: boolean;
}

export function SavedMovies({ movies, onToggleSave, darkMode }: SavedMoviesProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <Bookmark className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <h2 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          No saved movies yet
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Bookmark movies you're interested in to see them here
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Saved Movies ({movies.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            movie={movie}
            darkMode={darkMode}
            isSaved={true}
            onToggleSave={() => onToggleSave(movie)}
          />
        ))}
      </div>
    </div>
  );
}