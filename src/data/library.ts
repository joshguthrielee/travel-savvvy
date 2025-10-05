import { LibraryItinerary } from '@/types';

export const libraryItineraries: LibraryItinerary[] = [
  {
    id: 'lib-1',
    title: 'Bali Temple & Beach Hopping',
    destination: 'Bali',
    coverImage: '/images/siargao_1.jpg',
    duration: '4-7 days',
    vibes: ['culture', 'beach'],
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bali',
    creatorName: 'Sarah K.',
    items: [],
  },
  {
    id: 'lib-2',
    title: 'Tokyo Food & Culture Tour',
    destination: 'Tokyo',
    coverImage: '/images/siargao_2.jpg',
    duration: '5-7 days',
    vibes: ['foodie', 'culture'],
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tokyo',
    creatorName: 'Mike T.',
    items: [],
  },
  {
    id: 'lib-3',
    title: 'El Nido Island Paradise',
    destination: 'El Nido',
    coverImage: '/images/el_nido_2.jpg',
    duration: '3-5 days',
    vibes: ['beach', 'nature'],
    creatorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elnido',
    creatorName: 'Lisa M.',
    items: [],
  },
];
