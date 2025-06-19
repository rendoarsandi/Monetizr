'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardTitle, CardContent } from '@monetizr/ui';

interface Task {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [{ id: '1', title: 'Desain Halaman Utama', priority: 'High', assignee: 'A' }] },
  { id: 'inprogress', title: 'In Progress', tasks: [{ id: '2', title: 'Kembangkan API Auth', priority: 'High', assignee: 'B' }] },
  { id: 'review', title: 'Review', tasks: [] },
  { id: 'done', title: 'Done', tasks: [{ id: '3', title: 'Setup Proyek Next.js', priority: 'Medium', assignee: 'C' }] },
];

function SortableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-2">
        <CardContent className="p-3">
          <p>{task.title}</p>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span>{task.priority}</span>
            <span className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">{task.assignee}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KanbanColumn({ column }: { column: Column }) {
  return (
    <div className="w-72 flex-shrink-0">
      <Card className="bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>{column.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableContext items={column.tasks.map(t => t.id)}>
            {column.tasks.map(task => <SortableTask key={task.id} task={task} />)}
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
}

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
        // Simplified logic for moving between columns will be more complex
        console.log("Task moved", { active, over });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-1">
        {columns.map(col => <KanbanColumn key={col.id} column={col} />)}
      </div>
    </DndContext>
  );
}