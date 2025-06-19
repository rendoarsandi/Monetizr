import "@monetizr/ui/globals.css";
import React from 'react';

// Ini adalah layout dasar untuk panel admin.
// Anda dapat menambahkan sidebar, header, atau wrapper khusus admin di sini.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Anda bisa menambahkan class di sini untuk tema admin, misal: className="theme-admin" */}
      <body className="bg-gray-50 dark:bg-gray-900">
        {/* Contoh wrapper admin jika diperlukan */}
        <div className="admin-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
