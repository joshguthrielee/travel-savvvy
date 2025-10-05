export interface Post {
  id: string;
  sourceUrl: string;
  platform: 'instagram' | 'tiktok';
  handle: string;
  place: string;
  title: string;
  tags: string[];
  images: string[];
  caption?: string;
  recommendations?: string[];
  smartSuggestion?: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  type: 'activity' | 'dining' | 'transport' | 'accommodation';
  time: string;
  durationMinutes: number;
  notes?: string;
  sourceUrl?: string;
  transport?: {
    mode: 'walk' | 'drive' | 'transit' | 'taxi';
    minutes: number;
  };
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  aiVibe?: string;
  items: ItineraryItem[];
  smartSuggestions?: string[];
}

export interface LibraryItinerary {
  id: string;
  title: string;
  destination: string;
  coverImage: string;
  duration: string;
  vibes: string[];
  creatorAvatar: string;
  creatorName: string;
  items: ItineraryItem[];
}
