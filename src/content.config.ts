import { defineCollection, z } from "astro:content";

import { file } from "astro/loaders";

const work = defineCollection({
  loader: file("src/content/work.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    links: z.array(z.string()),
  }),
});

export const collections = { work };
