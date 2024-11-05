const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played'
].join(' ')

export const getAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI || '')}&scope=${encodeURIComponent(SCOPES)}`
}

export const getTokenFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null
  
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((acc: { [key: string]: string }, item) => {
      const [key, value] = item.split('=')
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})

  return hash.access_token || null
}

export interface SpotifyArtist {
  name: string;
  genres: string[];
}

export interface SpotifyTrack {
  name: string;
}

export const fetchUserData = async (token: string) => {
  try {
    // Fetch user profile
    const profileRes = await fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!profileRes.ok) throw new Error('Failed to fetch profile');
    const profile = await profileRes.json();

    // Fetch top artists
    const artistsRes = await fetch(
      'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term',
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    if (!artistsRes.ok) throw new Error('Failed to fetch artists');
    const artistsData = await artistsRes.json();

    // Fetch top tracks
    const tracksRes = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term',
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    if (!tracksRes.ok) throw new Error('Failed to fetch tracks');
    const tracksData = await tracksRes.json();

    // Process the data
    const topArtists = artistsData.items.map((artist: SpotifyArtist) => artist.name);
    const topTracks = tracksData.items.map((track: SpotifyTrack) => track.name);
    const allGenres = artistsData.items.flatMap((artist: SpotifyArtist) => artist.genres);
    const topGenres = [...new Set(allGenres)].slice(0, 5);

    // Calculate listening time (this is mock data as Spotify doesn't provide this directly)
    const listeningTime = Math.floor(Math.random() * 50000 + 10000);

    return {
      username: profile.display_name,
      topArtists,
      topTracks,
      topGenres,
      listeningTime
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};