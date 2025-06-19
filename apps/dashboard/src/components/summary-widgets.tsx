import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@monetizr/ui';

const summaryData = [
  { title: 'Proyek Aktif', value: '12', change: '+2', changeType: 'increase' },
  { title: 'Tugas Selesai', value: '86', change: '+10', changeType: 'increase' },
  { title: 'Akan Jatuh Tempo', value: '8', change: '-1', changeType: 'decrease' },
  { title: 'Aktivitas Tim', value: '32', change: '+5', changeType: 'increase' },
];

export function SummaryWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {/* Placeholder for icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.change} dari minggu lalu
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}