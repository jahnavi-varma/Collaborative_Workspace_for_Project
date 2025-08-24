import React, { useState } from 'react';
import { Task } from '@/entities/Task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";

export default function TaskForm({ task, projects, users, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    task || {
      title: '',
      description: '',
      project_id: '',
      assigned_to: '',
      status: 'todo',
      priority: 'medium',
      due_date: '',
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (formData.id) {
        await Task.update(formData.id, formData);
      } else {
        await Task.create(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving task:", error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <Input
        placeholder="Task Title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />
      <Textarea
        placeholder="Task Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={formData.project_id} onValueChange={(v) => handleChange('project_id', v)} required>
          <SelectTrigger><SelectValue placeholder="Project" /></SelectTrigger>
          <SelectContent>
            {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={formData.assigned_to} onValueChange={(v) => handleChange('assigned_to', v)}>
          <SelectTrigger><SelectValue placeholder="Assign To" /></SelectTrigger>
          <SelectContent>
            {users.map(u => <SelectItem key={u.id} value={u.email}>{u.full_name || u.email}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.priority} onValueChange={(v) => handleChange('priority', v)}>
          <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData.due_date ? format(new Date(formData.due_date), 'PPP') : 'Due Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent><Calendar mode="single" selected={formData.due_date ? new Date(formData.due_date) : undefined} onSelect={(d) => handleChange('due_date', d)} /></PopoverContent>
      </Popover>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" /> Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" /> {isLoading ? 'Saving...' : 'Save Task'}
        </Button>
      </div>
    </form>
  );
}