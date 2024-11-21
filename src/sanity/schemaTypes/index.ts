import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { resumeType } from "./resume";
import analysisResults from "./analysisResults";
import user from "./user";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [resumeType, user, analysisResults],
};
