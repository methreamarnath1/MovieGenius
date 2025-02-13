import React from 'react';
import { Star, Clock, User, Video, Bookmark, ExternalLink } from 'lucide-react';
import type { Movie } from '../lib/gemini';

interface MovieCardProps {
  movie: Movie;
  darkMode: boolean;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function MovieCard({ movie, darkMode, isSaved, onToggleSave }: MovieCardProps) {
  return (
    <div className={`${
      darkMode
        ? 'bg-gray-800 hover:shadow-purple-500/20'
        : 'bg-white hover:shadow-purple-500/10'
    } rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {movie.title}
            </h3>
            <div className="flex items-center mt-3 space-x-4">
              <div className="flex items-center space-x-1.5">
                <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>{movie.year}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className={`font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {movie.rating}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onToggleSave}
            className={`p-3 rounded-xl transition-colors ${
              isSaved
                ? 'bg-purple-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {movie.genre.map((g) => (
            <span
              key={g}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                darkMode
                  ? 'bg-purple-900/50 text-purple-300'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              {g}
            </span>
          ))}
        </div>

        <div className={`space-y-4 mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Video className="w-5 h-5" />
              <span className="font-medium">Director</span>
            </div>
            <p className="pl-8">{movie.director}</p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5" />
              <span className="font-medium">Cast</span>
            </div>
            <p className="pl-8">{movie.cast.join(', ')}</p>
          </div>
        </div>

        <p className={`mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {movie.synopsis}
        </p>

        <div className="flex flex-wrap gap-3">
          {movie.platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Watch on {platform.name}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}