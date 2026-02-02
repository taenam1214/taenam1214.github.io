import React from 'react';
import { FloatingNav } from '../ui/floating-nav';
import { useTheme } from '../../hooks/useTheme';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import { IconHome, IconUser, IconBriefcase, IconFolder, IconCode, IconMail, IconSun, IconMoon } from '@tabler/icons-react';

const Navigation = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    console.log('Theme toggling from:', resolvedTheme);
    toggleTheme();
  };

  const navItems = NAVIGATION_ITEMS.map((item) => {
    let icon;
    switch (item.name) {
      case 'Home':
        icon = <IconHome className="h-4 w-4" />;
        break;
      case 'About':
        icon = <IconUser className="h-4 w-4" />;
        break;
      case 'Experience':
        icon = <IconBriefcase className="h-4 w-4" />;
        break;
      case 'Projects':
        icon = <IconFolder className="h-4 w-4" />;
        break;
      case 'Skills':
        icon = <IconCode className="h-4 w-4" />;
        break;
      case 'Contact':
        icon = <IconMail className="h-4 w-4" />;
        break;
      default:
        icon = null;
    }
    return { ...item, icon };
  });

  return (
    <>
      <FloatingNav navItems={navItems} />

      {/* Theme Toggle Button */}
      <button
        onClick={handleThemeToggle}
        className="fixed top-10 right-10 z-[5001] p-3 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-lg border border-gray-300 dark:border-white/[0.2] hover:border-magenta transition-all duration-300 shadow-lg hover:shadow-magenta/30"
        aria-label="Toggle theme"
        title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {resolvedTheme === 'dark' ? (
          <IconSun className="h-5 w-5 text-gray-900 dark:text-white" />
        ) : (
          <IconMoon className="h-5 w-5 text-gray-900 dark:text-white" />
        )}
      </button>
    </>
  );
};

export default Navigation;
