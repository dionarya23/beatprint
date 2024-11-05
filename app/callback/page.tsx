'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenFromUrl } from '@/lib/spotify';
import { Loader2 } from 'lucide-react';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      // Store token in localStorage
      localStorage.setItem('spotify_access_token', token);
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      // Redirect back to home if no token
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-violet-400" />
      <p className="text-violet-200 mt-4">Connecting to Spotify...</p>
    </div>
  );
}