{
  "name": "Task",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Task title"
    },
    "description": {
      "type": "string",
      "description": "Task description"
    },
    "project_id": {
      "type": "string",
      "description": "Associated project ID"
    },
    "assigned_to": {
      "type": "string",
      "description": "Email of assigned user"
    },
    "assigned_by": {
      "type": "string",
      "description": "Email of user who assigned the task"
    },
    "status": {
      "type": "string",
      "enum": [
        "todo",
        "in_progress",
        "review",
        "completed"
      ],
      "default": "todo"
    },
    "priority": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high",
        "critical"
      ],
      "default": "medium"
    },
    "due_date": {
      "type": "string",
      "format": "date"
    },
    "estimated_hours": {
      "type": "number",
      "description": "Estimated hours to complete"
    },
    "actual_hours": {
      "type": "number",
      "description": "Actual hours spent"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "checklist": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": {
 