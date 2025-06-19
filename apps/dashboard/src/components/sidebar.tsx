'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@monetizr/ui/lib/cn';
import { Button } from '@monetizr/ui';

// Placeholder icons
const HomeIcon = () => <span>🏠</span>;
const FolderIcon = () => <span>📁</span>;
const CheckSquareIcon = () => <span>✅</span>;
const BarChartIcon = () => <span>📊</span>;
const SettingsIcon = () => <span>⚙️</span>;
const ChevronLeftIcon = () => <span>❮</span>;
const ChevronRightIcon = () => <span>❯</span>;

const navItems = [
  { href: '/dashboard', label: 'Ringkasan', icon: HomeIcon },
  { href: '/dashboard/projects', label: 'Proyek', icon: FolderIcon },
  { href: '/dashboard/my-tasks', label: 'Tugas Saya', icon: CheckSquareIcon },
  { href: '/dashboard/reports', label: 'Laporan', icon: BarChartIcon },
];

export function Sidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (isCollapsed: boolean) => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "relative h-screen bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && <span className="font-bold text-xl">SyncTask</span>}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>
      </div>
      <nav className="flex-grow p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-800",
              pathname === item.href && "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-800",
              pathname === "/dashboard/settings" && "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
               isCollapsed && "justify-center"
            )}
          >
            <SettingsIcon />
            {!isCollapsed && <span>Pengaturan</span>}
          </Link>
      </div>
    </aside>
  );
}