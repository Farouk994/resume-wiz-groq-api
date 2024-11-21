// schemas/resume.js

import { defineType, defineField } from "sanity";

export const resumeType = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "reference",
      to: [{ type: "user" }], // Ensure the 'user' type is defined in your schemas
      description: "Reference to the User who uploaded the resume",
    }),
    defineField({
      name: "sessionId",
      title: "Session ID",
      type: "string",
      description: "Session ID for anonymous users",
    }),
    defineField({
      name: "uploadDate",
      title: "Upload Date",
      type: "datetime",
      description: "Date when the resume was uploaded",
    }),
    defineField({
      name: "fileName",
      title: "File Name",
      type: "string",
      description: "Name of the uploaded file",
    }),
    defineField({
      name: "analysis",
      title: "Analysis",
      type: "string",
      description: "Analysis result or summary",
    }),
    defineField({
      name: "parsedContent",
      title: "Parsed Content",
      type: "object",
      fields: [
        defineField({
          name: "fullText",
          title: "Full Text",
          type: "text",
          description: "Full text of the resume",
        }),
        defineField({
          name: "sections",
          title: "Sections",
          type: "array",
          of: [
            defineField({
              name: "section",
              title: "Section",
              type: "object",
              fields: [
                defineField({
                  name: "sectionName",
                  title: "Section Name",
                  type: "string",
                }),
                defineField({
                  name: "content",
                  title: "Content",
                  type: "text",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "analysisId",
      title: "Analysis ID",
      type: "reference",
      to: [{ type: "analysisResults" }], // Ensure the 'analysisResults' type is defined
      description: "Reference to the Analysis Results",
    }),
  ],
  preview: {
    select: {
      title: "fileName",
      subtitle: "uploadDate",
    },
  },
});
