{
  "name": "TaskUpdate",
  "type": "object",
  "properties": {
    "task_id": {
      "type": "string",
      "description": "Associated task ID"
    },
    "update_text": {
      "type": "string",
      "description": "Progress update text"
    },
    "update_type": {
      "type": "string",
      "enum": [
        "progress",
        "comment",
        "status_change",
        "file_upload",
        "voice_note"
      ],
      "default": "progress"
    },
    "file_urls": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Attached files"
    },
    "voice_note_url": {
      "type": "string",
      "description": "Voice note file URL"
    },
    "hours_logged": {
      "type": "number",
      "description": "Hours worked on this update"
    },
    "previous_status": {
      "type": "string",
      "description": "Previous task status"
    },
    "new_status": {
      "type": "string",
      "description": "New task status"
    }
  },
  "required": [
    "task_id",
    "update_text"
  ]
}