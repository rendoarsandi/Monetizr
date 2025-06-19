import React from 'react';
import { SummaryWidgets } from '../components/summary-widgets';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryWidgets />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Grafik Aktivitas Tim</h3>
          <div className="h-80 mt-4 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
            [Placeholder untuk Grafik]
          </div>
        </div>
        <div className="col-span-3 bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Proyek Terbaru</h3>
          <div className="mt-4 space-y-4">
            <div>Proyek A</div>
            <div>Proyek B</div>
            <div>Proyek C</div>
          </div>
        </div>
      </div>
    </div>
  );
}
