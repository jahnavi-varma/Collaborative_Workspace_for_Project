{
  "name": "Meeting",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Meeting title"
    },
    "description": {
      "type": "string",
      "description": "Meeting description"
    },
    "project_id": {
      "type": "string",
      "description": "Associated project ID"
    },
    "meeting_type": {
      "type": "string",
      "enum": [
        "standup",
        "review",
        "milestone",
        "planning",
        "retrospective"
      ],
      "default": "standup"
    },
    "scheduled_date": {
      "type": "string",
      "format": "date-time"
    },
    "duration_minutes": {
      "type": "number",
      "default": 30
    },
    "attendees": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of attendee emails"
    },
    "actual_attendees": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of actual attendee emails"
    },
    "meeting_notes": {
      "type": "string",
      "description": "Meeting notes and outcomes"
    },
    "action_items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "task": {
            "type": "string"
          },
          "assigned_to": {
            "type": "string"
          },
          "due_date": {
            "type": "string",
 