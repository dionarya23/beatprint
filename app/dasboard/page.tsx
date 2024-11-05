// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Fingerprint } from 'lucide-react';
import SpotifyPoster from '@/components/SpotifyPoster';
import { fetchUserData } from '@/lib/spotify';
import { downloadPoster, sharePoster } from '@/lib/utils';

interface UserData {
  username: string;
  topArtists: string[];
  topTracks: string[];
  topGenres: string[];
  listeningTime: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('spotify_access_token');
      if (!token) {
        router.push('/');
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchUserData(token);
        setUserData(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load your music data. Please try again.');
        // If token is invalid, redirect to home
        if (error instanceof Error && error.message.includes('401')) {
          localStorage.removeItem('spotify_access_token');
          router.push('/');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleDownload = async () => {
    try {
      await downloadPoster(posterRef.current);
    } catch (error) {
      setError('Failed to download image. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      // First create image blob if we want to share the image
      let imageBlob;
      if (posterRef.current) {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(posterRef.current);
        imageBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });
      }
      
      await sharePoster(imageBlob);
    } catch (error) {
      setError('Failed to share. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-violet-400" />
        <p className="text-violet-200 mt-4">Loading your music profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-400 text-center mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-violet-400 hover:text-violet-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-slate-950 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-8 h-8 text-violet-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Beatprint
            </span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('spotify_access_token');
              router.push('/');
            }}
            className="text-violet-400 hover:text-violet-300 text-sm"
          >
            Sign Out
          </button>
        </nav>

        {userData && (
          <SpotifyPoster
            ref={posterRef}
            userData={userData}
            onShare={handleShare}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
}