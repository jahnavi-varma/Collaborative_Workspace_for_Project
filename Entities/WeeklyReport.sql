{
  "name": "WeeklyReport",
  "type": "object",
  "properties": {
    "user_email": {
      "type": "string",
      "description": "User email for the report"
    },
    "project_id": {
      "type": "string",
      "description": "Associated project ID"
    },
    "week_start_date": {
      "type": "string",
      "format": "date"
    },
    "week_end_date": {
      "type": "string",
      "format": "date"
    },
    "total_hours": {
      "type": "number",
      "description": "Total hours worked this week"
    },
    "tasks_completed": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of completed task IDs"
    },
    "tasks_in_progress": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of in-progress task IDs"
    },
    "achievements": {
      "type": "string",
      "description": "Key achievements this week"
    },
    "challenges": {
      "type": "string",
      "description": "Challenges faced this week"
    },
    "next_week_goals": {
      "type": "string",
      "description": "Goals for next week"
    },
    "status": {
 