import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowRight } from 'lucide-react';
import { posts } from '@/data/posts';
import { trips } from '@/data/trips';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const [linkInput, setLinkInput] = useState('');

  const handleSaveLink = () => {
    if (!linkInput.trim()) return;
    toast({ description: 'Saved to Collections' });
    setLinkInput('');
  };

  // Get first 2 posts for explore teaser
  const explorePosts = posts.slice(0, 2);
  
  // Get first 6 posts for collections carousel
  const collectionPosts = posts.slice(0, 6);

  return (
    <div className="pb-24 min-h-screen">
      {/* Hero */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(/images/hero_ph_el_nido.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-black/8" />
        <div className="relative h-full flex flex-col justify-end p-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Good morning,
          </h1>
          <h1 className="text-4xl font-bold text-white">Josh!</h1>
        </div>
      </div>

      <div className="px-4 space-y-6 pt-6">
        {/* New Trip Button */}
        <Button className="w-full h-12 text-base font-semibold">
          <Plus className="w-5 h-5 mr-2" />
          New Trip
        </Button>

        {/* Paste Link */}
        <div className="flex gap-3">
          <Input
            placeholder="Paste Instagram or TikTok link"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            className="flex-1 h-12"
          />
          <Button onClick={handleSaveLink} variant="secondary" className="h-12 px-6">
            Save
          </Button>
        </div>

        {/* Explore Teaser */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Explore</h2>
            <Link to="/explore" className="text-accent text-sm font-medium flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {explorePosts.map(post => (
              <div key={post.id} className="bg-card rounded-2xl overflow-hidden shadow-soft">
                <div className="aspect-square overflow-hidden">
                  <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{post.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Trips */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Trips</h2>
            <Link to="/trips" className="text-accent text-sm font-medium flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {trips.slice(0, 2).map(trip => (
              <Link 
                key={trip.id}
                to={`/trips/${trip.id}`}
                className="flex-shrink-0 w-72 bg-card rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="h-32 overflow-hidden">
                  <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{trip.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{trip.destination}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Collections Teaser */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Collections</h2>
            <Link to="/collections" className="text-accent text-sm font-medium flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {collectionPosts.map(post => (
              <div key={post.id} className="flex-shrink-0 w-40 relative rounded-2xl overflow-hidden">
                <div className="aspect-square">
                  <img src={post.images[0]} alt={post.place} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-sm drop-shadow-lg">
                      {post.place}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {collectionPosts.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
