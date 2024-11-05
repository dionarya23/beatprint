import React from 'react';
import { Music, Clock, Mic2, Radio, Fingerprint, Share2, Download } from 'lucide-react';

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

const SpotifyPoster = React.forwardRef<HTMLDivElement, PosterProps>(
  ({ userData, onShare, onDownload }, ref) => {
    return (
      <div className="space-y-8">
        {/* Poster */}
        <div 
          ref={ref}
          className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 p-8 rounded-lg text-white shadow-2xl border border-violet-900/50 animate-scaleIn"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Fingerprint className="w-6 h-6 text-violet-400" />
            <span className="text-sm font-medium text-violet-200">Beatprint</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Your Music Identity
            </h1>
            <p className="text-lg text-violet-200">{userData.username}'s Year in Music 2024</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Artists */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-violet-500/10 shadow-lg shadow-violet-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Mic2 className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-violet-200">Top Artists</h2>
              </div>
              <ul className="space-y-2">
                {userData.topArtists.map((artist, index) => (
                  <li key={artist} className="flex items-center gap-2">
                    <span className="text-sm text-violet-400">#{index + 1}</span>
                    <span className="font-medium text-violet-100">{artist}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Tracks */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-violet-500/10 shadow-lg shadow-violet-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Music className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-violet-200">Top Tracks</h2>
              </div>
              <ul className="space-y-2">
                {userData.topTracks.map((track, index) => (
                  <li key={track} className="flex items-center gap-2">
                    <span className="text-sm text-violet-400">#{index + 1}</span>
                    <span className="font-medium text-violet-100">{track}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Genres */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-violet-500/10 shadow-lg shadow-violet-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-violet-200">Top Genres</h2>
              </div>
              <ul className="space-y-2">
                {userData.topGenres.map((genre, index) => (
                  <li key={genre} className="flex items-center gap-2">
                    <span className="text-sm text-violet-400">#{index + 1}</span>
                    <span className="font-medium text-violet-100">{genre}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Listening Time */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-violet-500/10 shadow-lg shadow-violet-500/5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-violet-400" />
                <h2 className="text-xl font-semibold text-violet-200">Minutes Listened</h2>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {userData.listeningTime.toLocaleString()}
              </div>
              <div className="text-sm text-violet-300">minutes this year</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-violet-400/60 text-sm">
            beatprint.com
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={onDownload}
            className="group bg-white/5 hover:bg-white/10 text-violet-200 font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all border border-violet-500/10 hover:scale-105"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            Download Image
          </button>
          <button 
            onClick={onShare}
            className="group bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-violet-500/25 hover:scale-105"
          >
            <Share2 className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            Share Beatprint
          </button>
        </div>
      </div>
    );
  }
);

SpotifyPoster.displayName = 'SpotifyPoster';

export default SpotifyPoster;