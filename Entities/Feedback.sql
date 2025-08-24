{
  "name": "Feedback",
  "type": "object",
  "properties": {
    "feedback_type": {
      "type": "string",
      "enum": [
        "peer_review",
        "mentor_feedback",
        "task_review",
        "project_review"
      ],
      "default": "peer_review"
    },
    "target_user": {
      "type": "string",
      "description": "Email of user receiving feedback"
    },
    "project_id": {
      "type": "string",
      "description": "Associated project ID"
    },
    "task_id": {
      "type": "string",
      "description": "Associated task ID if applicable"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "description": "Rating from 1-5"
    },
    "feedback_text": {
      "type": "string",
      "description": "Detailed feedback"
    },
    "strengths": {
      "type": "string",
      "description": "Highlighted strengths"
    },
    "improvements": {
      "type": "string",
      "description": "Suggested improvements"
    },
    "is_anonymous": {
      "type": "boolean",
      "default": false,
      "description": "Whether feedback is anonymous"
    },
    "visibility": {
      "type": "string",
      "enum": [
        "private",
        "team",
        "public"
      ],
      "default": "team",
      "description": "Who can see this feedback"
    }
  },
  "required": [
    "feedback_type",
    "target_user",
    "rating",
    "feedback_text"
  ]
}