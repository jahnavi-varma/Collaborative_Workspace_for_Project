import React, { useState } from 'react';
import { Feedback } from '@/entities/Feedback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Save, X } from 'lucide-react';

export default function FeedbackForm({ feedback, projects, users, tasks, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    feedback || {
      feedback_type: 'peer_review',
      target_user: '',
      project_id: '',
      task_id: '',
      rating: 5,
      feedback_text: '',
      strengths: '',
      improvements: '',
      is_anonymous: false,
      visibility: 'team'
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
        await Feedback.update(formData.id, formData);
      } else {
        await Feedback.create(formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
    setIsLoading(false);
  };

  const renderStarRating = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => handleChange('rating', star)}
          className={`p-1 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          <Star className={`w-6 h-6 ${star <= formData.rating ? 'fill-current' : ''}`} />
        </button>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={formData.feedback_type} onValueChange={(v) => handleChange('feedback_type', v)}>
          <SelectTrigger><SelectValue placeholder="Feedback Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="peer_review">Peer Review</SelectItem>
            <SelectItem value="mentor_feedback">Mentor Feedback</SelectItem>
            <SelectItem value="task_review">Task Review</SelectItem>
            <SelectItem value="project_review">Project Review</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={formData.target_user} onValueChange={(v) => handleChange('target_user', v)} required>
          <SelectTrigger><SelectValue placeholder="Give feedback to..." /></SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.email}>
                {user.full_name || user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={formData.project_id} onValueChange={(v) => handleChange('project_id', v)}>
          <SelectTrigger><SelectValue placeholder="Project (Optional)" /></SelectTrigger>
          <SelectContent>
            {projects.map(project => (
              <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={formData.task_id} onValueChange={(v) => handleChange('task_id', v)}>
          <SelectTrigger><SelectValue placeholder="Task (Optional)" /></SelectTrigger>
          <SelectContent>
            {tasks.map(task => (
              <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium">Overall Rating</Label>
        {renderStarRating()}
      </div>

      <Textarea
        placeholder="Detailed feedback..."
        value={formData.feedback_text}
        onChange={(e) => handleChange('feedback_text', e.target.value)}
        className="min-h-[100px]"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea
          placeholder="Strengths and positive aspects..."
          value={formData.strengths}
          onChange={(e) => handleChange('strengths', e.target.value)}
          className="min-h-[80px]"
        />
        <Textarea
          placeholder="Areas for improvement..."
          value={formData.improvements}
          onChange={(e) => handleChange('improvements', e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={formData.is_anonymous}
            onCheckedChange={(checked) => handleChange('is_anonymous', checked)}
          />
          <Label htmlFor="anonymous">Give feedback anonymously</Label>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-3 block">Visibility</Label>
          <RadioGroup
            value={formData.visibility}
            onValueChange={(value) => handleChange('visibility', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private">Private (Only recipient)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="team" id="team" />
              <Label htmlFor="team">Team (All team members)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">Public (Everyone)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" /> Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" /> {isLoading ? 'Saving...' : 'Submit Feedback'}
        </Button>
      </div>
    </form>
  );
}