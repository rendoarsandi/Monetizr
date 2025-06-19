'use client';

import React from 'react';
import { Button } from '@monetizr/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@monetizr/ui';

const UserAvatar = () => (
    <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
        U
    </div>
);

export function DashboardHeader({ pageTitle }: { pageTitle: string }) {
  return (
    <header className="flex h-16 items-center justify-between bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6">
      <h1 className="text-xl font-semibold">{pageTitle}</h1>
      <div className="flex items-center gap-4">
        <Button>Buat Tugas Baru</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <UserAvatar />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Nama Pengguna</p>
                <p className="text-xs leading-none text-muted-foreground">
                  user@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuItem>Dukungan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}