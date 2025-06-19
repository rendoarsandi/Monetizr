'use client';

import React from 'react';
import "@monetizr/ui/globals.css";
import { Sidebar } from '../components/sidebar';
import { DashboardHeader } from '../components/header';
import { useUiStore } from '../store/use-ui-store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useUiStore();

  // A placeholder for getting the page title dynamically
  const pageTitle = "Ringkasan"; 

  return (
    <html lang="id">
      <body className="bg-gray-50 dark:bg-gray-950">
        <div className="flex">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            setIsCollapsed={setIsSidebarCollapsed} 
          />
          <div className="flex-1 flex flex-col h-screen">
            <DashboardHeader pageTitle={pageTitle} />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
