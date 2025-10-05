import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, Calendar, User } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Bookmark, label: 'Collections', path: '/collections' },
  { icon: Calendar, label: 'Trips', path: '/trips' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[44px] min-h-[44px] gap-1 transition-colors ${
                isActive ? 'text-accent' : 'text-muted-foreground'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
