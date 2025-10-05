import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal } from 'lucide-react';
import { libraryItineraries } from '@/data/library';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Explore</h1>
          
          {/* Search & Filters */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {libraryItineraries.map(itinerary => (
            <div key={itinerary.id} className="bg-card rounded-2xl overflow-hidden shadow-soft">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={itinerary.coverImage} 
                  alt={itinerary.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    {itinerary.duration}
                  </Badge>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{itinerary.title}</h3>
                <div className="flex gap-1.5 flex-wrap">
                  {itinerary.vibes.slice(0, 2).map(vibe => (
                    <Badge key={vibe} variant="outline" className="text-xs">
                      {vibe}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <img 
                    src={itinerary.creatorAvatar} 
                    alt={itinerary.creatorName}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-xs text-muted-foreground">{itinerary.creatorName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
