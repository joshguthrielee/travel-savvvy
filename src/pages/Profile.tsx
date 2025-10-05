import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Instagram, Share2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const { theme, accent, setTheme, setAccent } = useTheme();

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://savvy.app/ref/josh123');
    toast({ description: 'Referral link copied!' });
  };

  return (
    <div className="pb-24 min-h-screen">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* User Info */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl font-bold">
              J
            </div>
            <div>
              <h2 className="text-xl font-bold">Josh</h2>
              <p className="text-sm text-muted-foreground">josh@example.com</p>
            </div>
          </div>
        </Card>

        {/* Connections */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Connections</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <Instagram className="w-5 h-5" />
              Connect Instagram
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              Connect TikTok
            </Button>
          </div>
        </Card>

        {/* Referral */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Refer a Friend</h3>
          <div className="bg-muted rounded-xl p-3 font-mono text-sm">
            savvy.app/ref/josh123
          </div>
          <div className="flex gap-3">
            <Button onClick={handleCopyReferral} className="flex-1">
              Copy Link
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Theme */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Theme</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Mode</p>
              <div className="flex gap-3">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Accent Color</p>
              <div className="flex gap-3">
                <Button
                  variant={accent === 'teal' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setAccent('teal')}
                >
                  <div className="w-4 h-4 rounded-full bg-accent-teal mr-2" />
                  Teal
                </Button>
                <Button
                  variant={accent === 'red' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setAccent('red')}
                >
                  <div className="w-4 h-4 rounded-full bg-accent-red mr-2" />
                  Red
                </Button>
                <Button
                  variant={accent === 'blue' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setAccent('blue')}
                >
                  <div className="w-4 h-4 rounded-full bg-accent-blue mr-2" />
                  Blue
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
