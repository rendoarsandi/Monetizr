import { KanbanBoard } from '../../../../components/kanban-board';
import React from 'react';

export async function generateStaticParams() {
  // For static export, we'll generate a few sample project IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // The project ID can be used to fetch specific project data
  const { id } = await params;
  // console.log("Project ID:", id);

  return <KanbanBoard />;
}