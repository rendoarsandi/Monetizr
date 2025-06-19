import React from 'react';
import "@monetizr/ui/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
