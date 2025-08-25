import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ExternalLink, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const meetingTypeColors = {
  standup: "bg-blue-100 text-blue-700",
  review: "bg-emerald-100 text-emerald-700",
  milestone: "bg-purple-100 text-purple-700", 
  planning: "bg-amber-100 text-amber-700",
  retrospective: "bg-pink-100 text-pink-700"
};

export default function MeetingCard({ meeting, onAddToCalendar }) {
  const handleAddToCalendar = () => {
    const calendarUrl = onAddToCalendar(meeting);
    window.open(calendarUrl, '_blank');
  };

  return (
    <Card className="border border-slate-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-slate-900 text-sm">{meeting.title}</h4>
          <Badge className={meetingTypeColors[meeting.meeting_type]}>
            {meeting.meeting_type}
          </Badge>
        </div>
        
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            {format(new Date(meeting.scheduled_date), "MMM d, h:mm a")}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3" />
            {meeting.attendees?.length || 0} attendees
          </div>
        </div>
        
        {meeting.description && (
          <p className="text-xs text-slate-600 mt-2 line-clamp-2">{meeting.description}</p>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 text-xs"
          onClick={handleAddToCalendar}
        >
          <Calendar className="w-3 h-3 mr-2" />
          Add to Calendar
        </Button>
      </CardContent>
    </Card>
  );
}
