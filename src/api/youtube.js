const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const searchVideos = async (query) => {
  try {
    const response = await fetch(`${API_URL}/api/youtube/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar vídeos');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}; 