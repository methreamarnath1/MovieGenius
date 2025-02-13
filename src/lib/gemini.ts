import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Movie {
  title: string;
  year: number;
  genre: string[];
  rating: string;
  director: string;
  cast: string[];
  synopsis: string;
  platforms: {
    name: string;
    url: string;
  }[];
}

export async function getMovieRecommendations(preferences: string, apiKey: string): Promise<Movie[]> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Act as a movie recommendation expert. Based on these preferences: "${preferences}", 
    recommend 8 movies. For each movie, provide the following details in JSON format:
    {
      title: string,
      year: number,
      genre: string[],
      rating: string (IMDb rating),
      director: string,
      cast: string[] (list of 4-5 main actors),
      synopsis: string (a compelling 2-3 sentence description),
      platforms: [{ name: string, url: string }] (list of streaming platforms with their homepage URLs, e.g., Netflix, Prime Video, Disney+)
    }
    Return only the JSON array with the movies, no additional text. Ensure all URLs are valid streaming service homepages.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    throw error;
  }
}