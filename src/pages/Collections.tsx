import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Grid3x3, List } from 'lucide-react';
import { posts } from '@/data/posts';
import { PostViewer } from '@/components/PostViewer';
import { Post } from '@/types';
import { toast } from '@/hooks/use-toast';

export default function Collections() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [linkInput, setLinkInput] = useState('');
  const [hashtagSearch, setHashtagSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSaveLink = () => {
    if (!linkInput.trim()) return;
    toast({ description: 'Saved to Collections' });
    setLinkInput('');
  };

  // Group posts by place - limit to 3 places, 2 posts each
  const groupedPosts = posts
    .reduce((acc, post) => {
      if (!acc[post.place]) acc[post.place] = [];
      acc[post.place].push(post);
      return acc;
    }, {} as Record<string, Post[]>);

  const limitedPlaces = Object.entries(groupedPosts)
    .filter(([place]) => ['El Nido, Palawan', 'Bali', 'Tokyo'].includes(place))
    .slice(0, 3)
    .map(([place, placePosts]) => [place, placePosts.slice(0, 2)] as const);

  return (
    <>
      <div className="pb-24 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Collections</h1>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Paste Link */}
            <div className="flex gap-3">
              <Input
                placeholder="Paste Instagram or TikTok link"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                className="flex-1 h-11"
              />
              <Button onClick={handleSaveLink} variant="secondary" className="h-11 px-6">
                Save
              </Button>
            </div>

            {/* Hashtag Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search #restaurant, #hotel, #activity..."
                value={hashtagSearch}
                onChange={(e) => setHashtagSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>
        </div>

        {/* Collections by Place */}
        <div className="px-4 py-6 space-y-8">
          {limitedPlaces.map(([place, placePosts]) => (
            <div key={place}>
              <h2 className="text-lg font-bold mb-4">{place}</h2>
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
                {placePosts.map(post => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft cursor-pointer"
                  >
                    <div 
                      className={`overflow-hidden relative ${
                        viewMode === 'grid' ? 'aspect-square' : 'w-30 h-30'
                      }`}
                    >
                      <img 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <div className="bg-background/90 backdrop-blur-sm rounded-full p-1.5">
                          <img 
                            src={post.platform === 'instagram' ? '/icons/instagram.svg' : '/icons/tiktok.svg'} 
                            alt={post.platform}
                            className="w-3.5 h-3.5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                      <div className="flex gap-1.5 flex-wrap">
                        {Array.from(new Set(post.tags)).slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast({ description: 'Added to trip!' });
                        }}
                      >
                        Add to trip
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PostViewer 
        post={selectedPost} 
        open={!!selectedPost} 
        onOpenChange={(open) => !open && setSelectedPost(null)} 
      />
    </>
  );
}
