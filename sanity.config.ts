
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from './src/sanity/schemaTypes';
import { projectId, dataset } from './src/sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Resume Wizard',

  projectId,
  dataset,

  plugins: [deskTool()],
  schema: schema,
});

