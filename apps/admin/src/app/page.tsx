import React from 'react';
import { UsersDataTable } from '../components/users-data-table';

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Pengguna</h1>
      <UsersDataTable />
    </div>
  );
}
