import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';
import { trips } from '@/data/trips';

export default function Trips() {
  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Trips</h1>
          <Button size="icon" className="h-10 w-10">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Trips List */}
      <div className="px-4 py-6 space-y-4">
        {trips.map(trip => (
          <div key={trip.id} className="bg-card rounded-2xl overflow-hidden shadow-soft">
            {/* Cover - reduced height to ~25% */}
            <div className="h-24 overflow-hidden">
              <img 
                src={trip.coverImage} 
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{trip.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* AI Vibe - inside body with edit icon */}
              {trip.aiVibe && (
                <div className="bg-muted rounded-xl p-3 flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium mb-1">AI Vibe</p>
                    <p className="text-sm">{trip.aiVibe}</p>
                  </div>
                  <button className="opacity-60 hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex gap-3 pt-2">
                <Link to={`/trips/${trip.id}`} className="flex-1">
                  <Button className="w-full">Open itinerary</Button>
                </Link>
                <Button variant="outline">Share</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
