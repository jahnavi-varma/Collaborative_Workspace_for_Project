import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const feedbackTypeColors = {
  peer_review: "bg-blue-100 text-blue-700",
  mentor_feedback: "bg-purple-100 text-purple-700",
  task_review: "bg-emerald-100 text-emerald-700",
  project_review: "bg-amber-100 text-amber-700"
};

const visibilityColors = {
  private: "bg-gray-100 text-gray-700",
  team: "bg-blue-100 text-blue-700",
  public: "bg-emerald-100 text-emerald-700"
};

export default function FeedbackCard({ feedback, users, tasks }) {
  const targetUser = users.find(u => u.email === feedback.target_user);
  const feedbackGiver = users.find(u => u.email === feedback.created_by);
  const relatedTask = tasks.find(t => t.id === feedback.task_id);

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star 
          key={star} 
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );

  return (
    <Card className="shadow-md border border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                {feedback.is_anonymous ? '?' : (feedbackGiver?.full_name?.[0] || 'U')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-slate-900">
                {feedback.is_anonymous ? 'Anonymous' : (feedbackGiver?.full_name || feedbackGiver?.email)}
              </p>
              <p className="text-sm text-slate-500">
                to {targetUser?.full_name || feedback.target_user}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={feedbackTypeColors[feedback.feedback_type]}>
              {feedback.feedback_type.replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className={visibilityColors[feedback.visibility]}>
              {feedback.visibility}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          {renderStars(feedback.rating)}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(feedback.created_date), { addSuffix: true })}
          </div>
        </div>
        
        <p className="text-slate-700">{feedback.feedback_text}</p>
        
        {feedback.strengths && (
          <div className="p-3 bg-emerald-50 rounded-lg">
            <h4 className="font-medium text-emerald-800 text-sm mb-1">Strengths</h4>
            <p className="text-emerald-700 text-sm">{feedback.strengths}</p>
          </div>
        )}
        
        {feedback.improvements && (
          <div className="p-3 bg-amber-50 rounded-lg">
            <h4 className="font-medium text-amber-800 text-sm mb-1">Areas for Improvement</h4>
            <p className="text-amber-700 text-sm">{feedback.improvements}</p>
          </div>
        )}
        
        {relatedTask && (
          <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t">
            <MessageCircle className="w-3 h-3" />
            Related to task: <span className="font-medium">{relatedTask.title}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
