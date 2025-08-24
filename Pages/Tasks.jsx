import React, { useState, useEffect } from 'react';
import { Task, Project, User } from '@/entities/all';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CheckSquare } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';

const statusMap = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  completed: 'Completed',
};

const columns = ['todo', 'in_progress', 'review', 'completed'];

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [taskData, projectData, userData] = await Promise.all([
        Task.list('-updated_date'),
        Project.list(),
        User.list(),
      ]);
      setTasks(taskData);
      setProjects(projectData);
      setUsers(userData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };
  
  const handleTaskSaved = () => {
    setIsFormOpen(false);
    loadData();
  };
  
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const taskToMove = tasks.find(t => t.id === draggableId);
    if (taskToMove && taskToMove.status !== destination.droppableId) {
      // Optimistic UI update
      setTasks(prevTasks =>
        prevTasks.map(t => (t.id === draggableId ? { ...t, status: destination.droppableId } : t))
      );
      // Persist change to the backend
      await Task.update(draggableId, { status: destination.droppableId });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-blue-600" />
              Task Board
            </h1>
             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                        <Plus className="w-4 h-4 mr-2" />
                        New Task
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader><DialogTitle>Create New Task</DialogTitle></DialogHeader>
                    <TaskForm projects={projects} users={users} onSave={handleTaskSaved} onCancel={() => setIsFormOpen(false)}/>
                </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full items-start">
            {columns.map(columnId => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-4 rounded-lg h-full transition-colors ${
                      snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-4 text-slate-800">
                        {statusMap[columnId]} ({tasks.filter(t => t.status === columnId).length})
                    </h3>
                    <div className="space-y-3">
                      {tasks
                        .filter(task => task.status === columnId)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={snapshot.isDragging ? 'shadow-xl' : ''}
                              >
                                <TaskCard task={task} />
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}