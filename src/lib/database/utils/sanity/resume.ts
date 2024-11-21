// schemas/resume.js
export default {
    name: 'resume',
    type: 'document',
    title: 'Resume',
    fields: [
      {
        name: 'text',
        type: 'text',
        title: 'Resume Text',
        description: 'Full text of the resume',
      },
      {
        name: 'summary',
        type: 'text',
        title: 'Summary',
      },
      {
        name: 'strengths',
        type: 'array',
        title: 'Strengths',
        of: [{ type: 'string' }],
      },
      {
        name: 'weaknesses',
        type: 'array',
        title: 'Weaknesses',
        of: [{ type: 'string' }],
      },
      {
        name: 'suggestions',
        type: 'array',
        title: 'Suggestions for Improvement',
        of: [{ type: 'string' }],
      },
    ],
  };
  