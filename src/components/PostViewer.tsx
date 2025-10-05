import { Post } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

interface PostViewerProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PostViewer = ({ post, open, onOpenChange }: PostViewerProps) => {
  if (!post) return null;

  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleAddToTrip = () => {
    toast({ description: 'Added to trip!' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">{post.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Media */}
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <img 
              src={post.images[0]} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {post.images.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/80" />
              ))}
            </div>
          </div>

          {/* Handle & Caption */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              by {post.handle}
            </p>
            {post.caption && (
              <div>
                <p className={`text-sm ${!showFullCaption ? 'line-clamp-3' : ''}`}>
                  {post.caption}
                </p>
                {post.caption.length > 100 && (
                  <button 
                    onClick={() => setShowFullCaption(!showFullCaption)}
                    className="text-sm text-accent hover:underline mt-1"
                  >
                    {showFullCaption ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Travel Recommendations */}
          {post.recommendations && post.recommendations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Travel Recommendations</h3>
              <div className="space-y-2">
                {post.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span className="flex-1 text-sm">{rec}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 px-3 text-xs"
                      onClick={() => toast({ description: 'Added to trip!' })}
                    >
                      Add to trip
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart Suggestion */}
          {post.smartSuggestion && (
            <div className="bg-accent/10 rounded-xl p-3 text-sm">
              <span className="font-medium text-accent">💡 Smart tip: </span>
              {post.smartSuggestion}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleAddToTrip} className="flex-1">
              Add to trip
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">
                {post.platform === 'instagram' ? (
                  <img src="/icons/instagram.svg" alt="Instagram" className="w-4 h-4" />
                ) : (
                  <img src="/icons/tiktok.svg" alt="TikTok" className="w-4 h-4" />
                )}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
