import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Plus, Grid3x3, List, Wand2 } from 'lucide-react';
import { trips } from '@/data/trips';
import { formatDuration } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const collaborators = [
  { id: '1', name: 'Josh', role: 'Owner', avatar: '/api/avatar?name=Josh' },
  { id: '2', name: 'Alex', role: 'Editor', avatar: '/api/avatar?name=Alex' },
  { id: '3', name: 'Mia', role: 'Viewer', avatar: '/api/avatar?name=Mia' },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function TripDetail() {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [inviteEmail, setInviteEmail] = useState('');
  
  const trip = trips.find(t => t.id === id);
  
  if (!trip) {
    return <div className="p-4">Trip not found</div>;
  }

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;
    toast({ description: `Invite sent to ${inviteEmail}` });
    setInviteEmail('');
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/trips">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{trip.title}</h1>
              <p className="text-sm text-muted-foreground">{trip.destination}</p>
            </div>
            <Button size="sm" className="gap-2">
              <Wand2 className="w-4 h-4" />
              Organise my trip
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-3">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="gap-2"
            >
              <List className="w-4 h-4" />
              List
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="gap-2"
            >
              <Grid3x3 className="w-4 h-4" />
              Kanban
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="itinerary">
          <TabsList className="w-full">
            <TabsTrigger value="itinerary" className="flex-1">Itinerary</TabsTrigger>
            <TabsTrigger value="collab" className="flex-1">Collab</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6 mt-6">
            {/* Smart Suggestions */}
            {trip.smartSuggestions && trip.smartSuggestions.length > 0 && (
              <div className="bg-accent/10 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <span>💡</span>
                  Smart Suggestions
                </h3>
                <div className="space-y-2">
                  {trip.smartSuggestions.map((suggestion, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sm text-foreground/90 flex-1">• {suggestion}</span>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="h-7 px-3 text-xs"
                        onClick={() => toast({ description: 'Added to itinerary!' })}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'list' ? (
              <div className="space-y-3">
                {trip.items.map((item, index) => (
                  <div key={item.id}>
                    {/* Transit Divider */}
                    {item.transport && (
                      <div className="flex items-center gap-2 py-2 px-3 text-xs text-muted-foreground">
                        <div className="h-px flex-1 bg-border" />
                        <span>→ {item.transport.minutes} min {item.transport.mode}</span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                    )}
                    
                    {/* Item Card */}
                    <div className="bg-card rounded-2xl p-4 shadow-soft">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="text-xs text-muted-foreground font-medium pt-1 w-12 flex-shrink-0">
                              {item.time}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {formatDuration(item.durationMinutes)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {item.notes && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Item Button */}
                <Button variant="outline" className="w-full h-12 gap-2">
                  <Plus className="w-4 h-4" />
                  Add item
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center py-8">
                  Kanban view coming soon
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="collab" className="mt-6 space-y-4">
            {/* Collaborators List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Collaborators</h3>
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-soft">
                  <div 
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium border-2 border-background"
                    style={{
                      backgroundImage: collaborator.avatar ? `url(${collaborator.avatar})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLDivElement;
                      target.style.backgroundImage = 'none';
                      target.textContent = getInitials(collaborator.name);
                    }}
                  >
                    {!collaborator.avatar && getInitials(collaborator.name)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{collaborator.name}</p>
                    <Badge variant="outline" className="text-xs h-5 mt-0.5">
                      {collaborator.role}
                    </Badge>
                  </div>
                  {collaborator.role === 'Owner' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs"
                      onClick={() => toast({ description: 'Cannot remove owner' })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Invite Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Invite</h3>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 h-11"
                />
                <Button 
                  onClick={handleSendInvite}
                  className="h-11"
                >
                  Send invite
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
