import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'analysisResults',
  title: 'Analysis Results',
  type: 'document',
  fields: [
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    // Add other fields as needed
  ],
});
