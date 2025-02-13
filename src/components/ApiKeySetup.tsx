import React, { useState } from 'react';
import { Film, Moon, Sun, ExternalLink, Key, ArrowRight } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (key: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function ApiKeySetup({ onApiKeySet, darkMode, setDarkMode }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-purple-50 to-indigo-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <header className="py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Film className={`w-10 h-10 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-4xl font-bold ml-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>MovieGenius</h1>
            </div>
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
        </header>

        <main className="max-w-2xl mx-auto py-12">
          <div className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden`}>
            {/* Progress Steps */}
            <div className="flex items-center justify-between px-8 pt-8 mb-8">
              {[1, 2, 3].map((number) => (
                <div key={number} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${step >= number 
                      ? darkMode 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-purple-600 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                    }
                  `}>
                    {number}
                  </div>
                  {number < 3 && (
                    <div className={`w-24 h-1 mx-2 ${
                      step > number
                        ? darkMode ? 'bg-purple-500' : 'bg-purple-600'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="px-8 pb-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome to MovieGenius!
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Get personalized movie recommendations powered by AI
                    </p>
                  </div>
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      To get started, you'll need:
                    </h3>
                    <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        <span>A Google AI (Gemini) API key</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        <span>2 minutes of your time</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    Let's Get Started
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Get Your API Key
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Follow these simple steps to get your Gemini API key
                    </p>
                  </div>
                  <ol className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>1</span>
                      <div>
                        <p className="mb-2">Visit Google AI Studio</p>
                        <a
                          href="https://makersuite.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                            darkMode
                              ? 'bg-gray-700 text-white hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Get API Key <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>2</span>
                      <p>Create or select a project</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>3</span>
                      <p>Copy your API key</p>
                    </li>
                  </ol>
                  <button
                    onClick={() => setStep(3)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    I Have My API Key
                  </button>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center">
                    <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Enter Your API Key
                    </h2>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Paste your Gemini API key below to start using MovieGenius
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="apiKey"
                      className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      API Key
                    </label>
                    <input
                      type="password"
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Paste your API key here"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      darkMode
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    Start Using MovieGenius
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}