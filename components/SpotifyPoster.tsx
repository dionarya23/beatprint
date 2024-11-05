import React from 'react';
import { Music, Fingerprint, Share2, Download, Calendar, MapPin, Clock } from 'lucide-react';

interface PosterProps {
  userData: {
    username: string;
    topArtists: string[];
    topTracks: string[];
    topGenres: string[];
    listeningTime: number;
  };
  onShare: () => void;
  onDownload: () => void;
}

const FestivalPoster = React.forwardRef<HTMLDivElement, PosterProps>(
  ({ userData, onShare, onDownload }, ref) => {
    const currentYear = new Date().getFullYear();
    const formatDate = () => {
      const date = new Date();
      return date.toLocaleDateString('en-US', { 
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    };

    return (
      <div className="space-y-8">
        <div 
          ref={ref}
          className="w-full max-w-3xl mx-auto bg-gradient-to-b from-black to-violet-950 p-8 md:p-12 rounded-lg text-white shadow-2xl border border-violet-900/50"
        >
          {/* Festival Presents Line */}
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-1 border-2 border-violet-400/50 rounded-full">
              <p className="text-violet-400 text-sm tracking-widest">SPOTIFY PRESENTS</p>
            </div>
          </div>

          {/* Festival Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent pb-2">
                BEATPRINT
              </h1>
              <div className="absolute -top-4 -right-2 text-xs bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2 py-0.5 rounded-full">
                FEST
              </div>
            </div>
            <h2 className="text-2xl font-bold text-violet-400">{currentYear} EDITION</h2>
            <p className="text-violet-300 uppercase tracking-widest">Curated by {userData.username}</p>
          </div>

          {/* Festival Details */}
          <div className="flex justify-center gap-6 mb-12 text-sm">
            <div className="flex items-center gap-2 text-violet-300">
              <Calendar className="w-4 h-4" />
              {formatDate()}
            </div>
            <div className="flex items-center gap-2 text-violet-300">
              <MapPin className="w-4 h-4" />
              Spotify Arena
            </div>
            <div className="flex items-center gap-2 text-violet-300">
              <Clock className="w-4 h-4" />
              {Math.floor(userData.listeningTime / 60)}h of Music
            </div>
          </div>

          {/* Main Stage */}
          <div className="space-y-12 mb-12">
            <div className="text-center">
              <div className="inline-block px-4 py-1 bg-violet-500/10 rounded-full mb-6">
                <p className="text-violet-400 text-sm">MAIN STAGE</p>
              </div>
              {/* Headliners */}
              {userData.topArtists.slice(0, 2).map((artist, index) => (
                <div 
                  key={artist}
                  className="text-5xl md:text-7xl font-bold mb-4 tracking-tight relative group"
                  style={{
                    background: index === 0 
                      ? 'linear-gradient(to right, #f0f, #00ff94)'
                      : 'linear-gradient(to right, #00ff94, #0ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {artist.toUpperCase()}
                  <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ⭐
                  </span>
                </div>
              ))}
            </div>

            {/* Second Stage */}
            <div className="text-center">
              <div className="inline-block px-4 py-1 bg-fuchsia-500/10 rounded-full mb-6">
                <p className="text-fuchsia-400 text-sm">SECOND STAGE</p>
              </div>
              {/* Secondary Artists */}
              <div className="space-y-4">
                {userData.topArtists.slice(2).map((artist) => (
                  <div 
                    key={artist}
                    className="text-3xl md:text-4xl font-bold text-white hover:text-fuchsia-400 transition-colors"
                  >
                    {artist.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Special Performances */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-pink-500/10 rounded-full">
                <p className="text-pink-400 text-sm">SPECIAL PERFORMANCES</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              {userData.topTracks.map((track) => (
                <div 
                  key={track}
                  className="px-4 py-2 bg-white/5 rounded-lg text-lg text-violet-200 hover:bg-white/10 transition-colors"
                >
                  {track}
                </div>
              ))}
            </div>
          </div>

          {/* Festival Categories */}
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1 bg-blue-500/10 rounded-full mb-2">
              <p className="text-blue-400 text-sm">FEATURING GENRES</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {userData.topGenres.map((genre) => (
                <span 
                  key={genre}
                  className="px-4 py-1.5 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-full text-violet-300 text-sm border border-violet-500/10 hover:border-violet-500/30 transition-colors"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Details */}
          <div className="mt-12 pt-8 border-t border-violet-900/50 text-center space-y-4">
            <div className="text-sm text-violet-400">
              <div className="mb-2">TICKETS AVAILABLE AT SPOTIFY.COM</div>
              <div className="text-xs text-violet-500">Must have {userData.listeningTime.toLocaleString()} minutes of listening experience</div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Fingerprint className="w-4 h-4 text-violet-400" />
              <span className="text-xs text-violet-500">beatprint.com</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={onDownload}
            className="group bg-white/5 hover:bg-white/10 text-violet-200 font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all border border-violet-500/10 hover:scale-105"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            Download Poster
          </button>
          <button 
            onClick={onShare}
            className="group bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-violet-500/25 hover:scale-105"
          >
            <Share2 className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            Share Poster
          </button>
        </div>
      </div>
    );
  }
);

FestivalPoster.displayName = 'FestivalPoster';

export default FestivalPoster;