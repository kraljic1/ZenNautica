import React, { useState, useCallback, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  videoId: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(true);

  // Load thumbnail with progressive enhancement
  useEffect(() => {
    const loadThumbnail = async () => {
      setIsLoadingThumbnail(true);
      
      // Start with default quality thumbnail while trying higher quality
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);

      try {
        // Try to load maxresdefault in the background
        const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = maxResUrl;
        });

        // If maxresdefault loaded successfully, update the URL
        setThumbnailUrl(maxResUrl);
      } catch {
        // Silently fall back to hqdefault which is already set
      } finally {
        setIsLoadingThumbnail(false);
      }
    };

    loadThumbnail();
  }, [videoId]);

  const loadYouTubePlayer = useCallback(() => {
    try {
      setIsPlaying(true);
      setError(null);
    } catch (err) {
      setError('Failed to load video player. Please try again.');
    }
  }, []);

  if (error) {
    return (
      <div className="relative w-full bg-gray-100 rounded-lg" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center flex-col p-4">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsPlaying(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden bg-gray-100"
      style={{ paddingBottom: '56.25%' }}
    >
      {!isPlaying ? (
        <div className="absolute inset-0">
          {thumbnailUrl && (
            <div className={`w-full h-full transition-opacity duration-300 ${isLoadingThumbnail ? 'opacity-0' : 'opacity-100'}`}>
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => setIsLoadingThumbnail(false)}
              />
            </div>
          )}
          <div 
            className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer group"
            onClick={loadYouTubePlayer}
            onKeyPress={(e) => e.key === 'Enter' && loadYouTubePlayer()}
            role="button"
            tabIndex={0}
            aria-label="Play video"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center 
                          transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 ml-1" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          className="absolute top-0 left-0 w-full h-full"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};

export default VideoEmbed;