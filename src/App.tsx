import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Film, Moon, Sun, Key, Bookmark } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { getMovieRecommendations, Movie } from './lib/gemini';
import { ApiKeySetup } from './components/ApiKeySetup';
import { SavedMovies } from './components/SavedMovies';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [savedMovies, setSavedMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('savedMovies');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('geminiApiKey') || '';
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('geminiApiKey', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  const handleSearch = async (query: string) => {
    if (!apiKey) {
      toast.error('Please set up your API key first');
      return;
    }

    setIsLoading(true);
    setShowSaved(false);
    try {
      const recommendations = await getMovieRecommendations(query, apiKey);
      setMovies(recommendations);
    } catch (error) {
      toast.error('Failed to get recommendations. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveMovie = (movie: Movie) => {
    setSavedMovies(prev => {
      const isAlreadySaved = prev.some(m => m.title === movie.title);
      if (isAlreadySaved) {
        toast.success(`Removed "${movie.title}" from bookmarks`);
        return prev.filter(m => m.title !== movie.title);
      } else {
        toast.success(`Saved "${movie.title}" to bookmarks`);
        return [...prev, movie];
      }
    });
  };

  if (!apiKey) {
    return <ApiKeySetup onApiKeySet={setApiKey} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-purple-50 to-indigo-50'}`}>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: darkMode ? '#1F2937' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
          },
        }}
      />
      
      <header className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Film className={`w-10 h-10 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-4xl font-bold ml-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>MovieGenius</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`p-2 rounded-full hover:bg-opacity-20 relative ${darkMode ? 'hover:bg-gray-300' : 'hover:bg-gray-700'}`}
                title="Saved Movies"
              >
                <Bookmark className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                {savedMovies.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {savedMovies.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setApiKey('')}
                className={`p-2 rounded-full hover:bg-opacity-20 ${darkMode ? 'hover:bg-gray-300' : 'hover:bg-gray-700'}`}
                title="Change API Key"
              >
                <Key className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full hover:bg-opacity-20 ${darkMode ? 'hover:bg-gray-300' : 'hover:bg-gray-700'}`}
                title="Toggle Dark Mode"
              >
                {darkMode ? (
                  <Sun className="text-gray-300" />
                ) : (
                  <Moon className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
          
          {!showSaved && (
            <div className="flex justify-center mb-12">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} darkMode={darkMode} />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        {showSaved ? (
          <SavedMovies 
            movies={savedMovies} 
            onToggleSave={toggleSaveMovie}
            darkMode={darkMode}
          />
        ) : isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${darkMode ? 'border-purple-400' : 'border-purple-600'}`}></div>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.title} 
                movie={movie} 
                darkMode={darkMode}
                isSaved={savedMovies.some(m => m.title === movie.title)}
                onToggleSave={() => toggleSaveMovie(movie)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Film className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <h2 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Enter your preferences to get personalized movie recommendations
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;