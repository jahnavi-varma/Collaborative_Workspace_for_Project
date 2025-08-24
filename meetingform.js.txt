import React, { useState } from 'react';
import { Meeting } from '@/entities/Meeting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";

export default function MeetingForm({ meeting, selectedDate, projects, users, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    meeting || {
      title: '',
      description: '',
      project_id: '',
      meeting_type: 'standup',
      scheduled_date: selectedDate ? selectedDate.toISOString().slice(0, 16) : '',
      duration_minutes: 30,
      attendees: [],
      status: 'scheduled'
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
        await Meeting.update(formData.id, formData);
      } else {
        await Meeting.create(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving meeting:", error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <Input
        placeholder="Meeting Title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />
      <Textarea
        placeholder="Meeting Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={formData.project_id} onValueChange={(v) => handleChange('project_id', v)}>
          <SelectTrigger><SelectValue placeholder="Project (Optional)" /></SelectTrigger>
          <SelectContent>
            {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={formData.meeting_type} onValueChange={(v) => handleChange('meeting_type', v)}>
          <SelectTrigger><SelectValue placeholder="Meeting Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="standup">Daily Standup</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="milestone">Milestone</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="retrospective">Retrospective</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="datetime-local"
          value={formData.scheduled_date}
          onChange={(e) => handleChange('scheduled_date', e.target.value)}
          required
        />
        <Select value={formData.duration_minutes.toString()} onValueChange={(v) => handleChange('duration_minutes', parseInt(v))}>
          <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="90">1.5 hours</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600">Attendees (comma separated emails)</label>
        <Input
          placeholder="john@example.com, sarah@example.com"
          value={formData.attendees?.join(', ') || ''}
          onChange={(e) => handleChange('attendees', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
          className="mt-1"
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" /> Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" /> {isLoading ? 'Saving...' : 'Schedule Meeting'}
        </Button>
      </div>
    </form>
  );
}