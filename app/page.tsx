'use client';

import React from 'react';
import { Music, Fingerprint } from 'lucide-react';
import { getAuthUrl } from '@/lib/spotify';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Landing Page */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 text-6xl font-bold mb-4 animate-float">
          <Fingerprint className="w-16 h-16 text-violet-400" />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Beatprint
          </span>
        </div>
        
        {/* Description */}
        <p className="text-xl text-violet-200 max-w-2xl animate-slideUp opacity-0 [animation-delay:400ms]">
          Transform your Spotify stats into a stunning visual fingerprint of your musical identity
        </p>
        
        {/* Login Button */}
        <div className="space-y-4 animate-slideUp opacity-0 [animation-delay:800ms]">
          <a
            href={getAuthUrl()}
            className="group bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold py-4 px-8 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-violet-500/25 hover:scale-105"
          >
            <Music className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Connect with Spotify
          </a>
          <p className="text-sm text-violet-300">
            Free • Instant • No registration required
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-violet-400/60 p-8 space-y-2">
        <p>© 2024 Beatprint • Your music fingerprint</p>
        <p className="flex items-center justify-center gap-1.5">
          Made with{" "}
          <span className="text-pink-500">❤</span>
          {" "}by{" "}
          <span className="text-violet-400 hover:text-violet-300 transition-colors">
            Dion Pamungkas
          </span>
        </p>
      </footer>
    </main>
  );
}