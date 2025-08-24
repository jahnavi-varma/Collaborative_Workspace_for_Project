{
  "name": "Project",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Project name"
    },
    "description": {
      "type": "string",
      "description": "Project description"
    },
    "status": {
      "type": "string",
      "enum": [
        "planning",
        "active",
        "on_hold",
        "completed"
      ],
      "default": "planning"
    },
    "start_date": {
      "type": "string",
      "format": "date"
    },
    "end_date": {
      "type": "string",
      "format": "date"
    },
    "team_members": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of team member emails"
    },
    "project_lead": {
      "type": "string",
      "description": "Email of project lead"
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
    "github_repo": {
      "type": "string",
      "description": "GitHub repository URL"
    },
    "notion_link": {
      "type": "string",
      "description": "Notion workspace URL"
    },
    "google_docs": {
      "type": "string",
      "description": "Google Docs URL"
    }
  },
  "required": [
    "name",
    "project_lead"
  ]
}