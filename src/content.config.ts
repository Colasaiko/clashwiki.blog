import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.string().default('Admin'),
  }),
});

const brands = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/brands" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string().default('机场推荐'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    updatedDate: z.coerce.date(),
    image: z.string().optional(),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/topics" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    featured: z.boolean().default(false),
    updatedDate: z.coerce.date(),
  }),
});

export const collections = { blog, brands, topics };
