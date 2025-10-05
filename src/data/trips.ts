import { Trip, ItineraryItem } from '@/types';

const elNidoItems: ItineraryItem[] = [
  {
    id: 'item-1',
    title: 'Island Hopping Tour A',
    type: 'activity',
    time: '08:00',
    durationMinutes: 540, // 9 hours
    notes: 'Book in advance',
  },
  {
    id: 'item-2',
    title: 'Las Cabañas Sunset',
    type: 'activity',
    time: '18:30',
    durationMinutes: 90,
    transport: {
      mode: 'drive',
      minutes: 15,
    },
  },
];

export const trips: Trip[] = [
  {
    id: 'trip-1',
    title: 'El Nido Adventure',
    destination: 'El Nido, Palawan',
    coverImage: '/images/hero_ph_el_nido.jpg',
    startDate: '2025-02-15',
    endDate: '2025-02-20',
    aiVibe: 'Beach paradise with island hopping and local cuisine exploration',
    items: elNidoItems,
    smartSuggestions: [
      'Amigos Bar — 22h · Local favorite',
      "Maa's Grill — 19h30 · Close to hotel",
    ],
  },
  {
    id: 'trip-2',
    title: 'Siargao Surf Escape',
    destination: 'Siargao',
    coverImage: '/images/siargao_1.jpg',
    startDate: '2025-03-10',
    endDate: '2025-03-17',
    aiVibe: 'Surf, sun, and island vibes',
    items: [],
  },
];
