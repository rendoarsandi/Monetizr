import { KanbanBoard } from '../../../../components/kanban-board';
import React from 'react';

export default function ProjectPage({ params }: { params: { id: string } }) {
  // The project ID can be used to fetch specific project data
  // console.log("Project ID:", params.id);
  
  return <KanbanBoard />;
}